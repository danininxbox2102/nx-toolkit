export interface GameFile{
  name: string;
}

export interface GameContent{
  type: string;
  name: string;
}

export interface GameInfo {
  createdAt?: number;
  createdAtDate?: string;
  gameId?: string;
  gameFiles?: Array<GameFile|GameContent>;
  atmosphere?: string[];
}
