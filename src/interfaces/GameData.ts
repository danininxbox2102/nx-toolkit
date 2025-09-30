export interface GameFile{
  type:"base"|"update"|"dlc"|"atmosphere"|"delete";
  file: string;
  name?: string;
}



export interface GameInfo {
  createdAt?: number;
  createdAtDate?: string;
  gameId?: string;
  gameFiles?: Array<GameFile>;
  optionalFiles?: Array<GameFile>;
  atmosphere?: string[];
}
