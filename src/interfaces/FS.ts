export interface File {
  name: string;
  fullPath: string;
}

export interface Folder {
  name: string;
  fullPath: string;
  children: FolderContents;
}

export interface FolderContents {
  folders: Folder[],
  files: File[]
}
