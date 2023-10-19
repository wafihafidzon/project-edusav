const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
let createWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1010,
    maxWidth: 1600,
    maxHeight: 1010,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !app.isPackaged,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "homepage.html"));
  app.isPackaged && Menu.setApplicationMenu(null);

  mainWindow.on("closed", () => {
    if (createWindow) {
      createWindow.close();
    }
  });
}

function createCreateWindow() {
  if (!createWindow) {
    createWindow = new BrowserWindow({
      width: 600,
      height: 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    createWindow.loadFile(path.join(__dirname, "create.html"));

    createWindow.on("closed", () => {
      createWindow = null;
    });
  }
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    createMainWindow();
  }
});

ipcMain.on("create-data", () => {
  createCreateWindow();
});

ipcMain.on("reload", () => {
  if (mainWindow) {
    mainWindow.reload();
  }
});
