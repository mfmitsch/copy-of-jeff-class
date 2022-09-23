import { createReducer, on } from '@ngrx/store';
import * as fromSongsEvents from '../../features/playlists/state/songs.actions';
import { AppEvents } from '../app.actions';
export interface ErrorsState {
  hasErrors: boolean;
  message?: string;
}

const initialState: ErrorsState = {
  hasErrors: false,
};

export const reducer = createReducer(
  initialState,
  on(AppEvents.errordismissed, () => initialState),
  on(fromSongsEvents.SongEvents.error, (s, a) => ({
    hasErrors: true,
    message: a.payload.message,
  }))
);
