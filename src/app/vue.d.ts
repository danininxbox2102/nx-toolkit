interface Window {
  electronAPI: {
    openFolder: () => Promise<{ cancelled: boolean, filePaths: string[] }>;
    getEntries: (...args) => Promise<{ folders: string[], files:string[] }>;
  };
}
