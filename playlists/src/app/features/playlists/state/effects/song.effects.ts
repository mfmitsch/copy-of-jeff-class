import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SongEntity } from '../reducers/songs.reducer';
import { SongEvents, SongDocuments } from '../songs.actions';
@Injectable()
export class SongEffects {
  readonly apiUrl = environment.apiUrl + 'songs';

  addSong$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SongEvents.added), // When a action of type SongEvents.added happens (only only that!)
      concatMap(
        (
          { payload } // get the payload off that action (the SongCreate instance)
        ) =>
          this.http
            .post<SongEntity>(this.apiUrl, payload) // Send it to the API
            .pipe(
              map((payload) => SongDocuments.song({ payload })),
              catchError(() =>
                of(
                  SongEvents.error({
                    payload: { message: 'Could Not Add That Song!' },
                  })
                )
              )
            ) // When (later) it comes back from the API, turn it into a Song document
      )
    );
  });

  // the effect sees EVERY action that has been dispatched.
  // usually an effect turns one action into another action.
  loadSongs$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SongEvents.featureentered),
        switchMap(() =>
          this.http.get<{ data: SongEntity[] }>(this.apiUrl).pipe(
            map((response) => response.data), // { data: []} => []
            map((payload) => SongDocuments.songs({ payload }))
          )
        )
      );
    },
    { dispatch: true }
  );

  // We are going to need an action that says "when the featureentered -> (go to the api) -> songs"
  constructor(private actions$: Actions, private http: HttpClient) {}
}
