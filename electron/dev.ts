import {app, BrowserWindow, ipcMain, dialog} from "electron";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
import fs from "fs-extra";
import {describe} from "node:test";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    }
  })

  win.loadURL(`http://localhost:5173`).then();
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('open-folder', () => {
  return dialog.showOpenDialog({
    properties: ['openDirectory'],
  })
});

ipcMain.handle('get-entries', (event,dirPath) => {
  if (dirPath === "") {
    console.error("dirPath is empty");
    return null;
  }

  const entries:{folders: string[], files: string[]} = {folders: [], files: []};

  fs.readdirSync(dirPath).forEach(file => {
      const stat = fs.lstatSync(path.join(dirPath, file))
      if (stat.isDirectory()) {
        entries.folders.push(file);
        return;
      }
      if (stat.isFile()) {
        entries.files.push(file);
        return;
      }
    })

  return entries;
});

