export interface PlaylistResponse {
    playlists: {
      items: {name: string, description: string, imageUrl: [{url: string}]}[];
    };
  }