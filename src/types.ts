export interface Movie {
    title: string;
    release_date: string;
    episode_id: number;
    opening_crawl?: string;  // Can be undefined
    director?: string;
    producer?: string;
  }
  
  export interface Rating {
    imdb: number;
    rottenTomatoes: number;
    metacritic: number;
    average: number;
    Poster?: string;
  }
  