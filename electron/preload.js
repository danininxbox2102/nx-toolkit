
// eslint-disable-next-line @typescript-eslint/no-require-imports
const contextBridge = require("electron").contextBridge
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ipcRenderer = require("electron").ipcRenderer

contextBridge.exposeInMainWorld('electronAPI', {
  openFolder: () => ipcRenderer.invoke('open-folder'),  // Вызываем IPC handler
  getEntries: (dirPath) => ipcRenderer.invoke('get-entries', dirPath),  // Вызываем IPC handler
});
