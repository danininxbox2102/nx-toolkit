import {app, BrowserWindow, ipcMain, dialog} from "electron";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
import fs from "fs-extra";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface File {
  name: string;
  fullPath: string;
}

interface Folder {
  name: string;
  fullPath: string;
  children: FolderContents;
}

interface FolderContents {
  folders: Folder[],
  files: File[]
}


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



const readDir = (folderPath:string) => {
  const entries:FolderContents = {folders: [], files: []};

  try {
    fs.readdirSync(folderPath).forEach(arg => {
      const entry = arg as never as string;

      const filePath = path.join(folderPath, entry);

      const stat = fs.lstatSync(filePath)
      if (stat.isDirectory()) {
        const folder:Folder = {name:entry, children:{folders:[],files:[]}, fullPath:""};
        folder.children = readDir(filePath)
        folder.fullPath = filePath;
        entries.folders.push(folder);
        return;
      }

      if (stat.isFile()) {
        entries.files.push({name:entry,fullPath:filePath});
        return;
      }
    })
  } catch (error) {
    console.error(error);
  }

  return entries;
}

ipcMain.handle('get-entries', (event,dirPath) => {
  if (dirPath === "") {
    console.error("dirPath is empty");
    return null;
  }

  return readDir(dirPath);
});

