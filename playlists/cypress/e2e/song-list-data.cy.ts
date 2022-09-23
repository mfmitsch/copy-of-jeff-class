describe('The list is displayed when data comes from the API', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:1337/songs', {
      data: [
        {
          id: '1',
          title: 'Get Back',
          artist: 'The Beatles',
          album: 'Revolver',
        },
        { id: '2', title: 'Sympathy for the Devil', artist: 'Rolling Stones' },
      ],
    });
    cy.visit('/playlists/songs');
  });

  it('A warning is not displayed that there are no songs', () => {
    cy.get('[data-test="playlists-no-songs-warning"]').not('exist');
  });
  it('should  display the song list', () => {
    cy.get('[data-test="playlists-songs-list"]').should('exist');
  });
});
