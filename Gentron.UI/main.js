"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var win;
function createWindow() {
    var windowOpts = {
        height: 1080,
        width: 1920,
        webPreferences: {
            nodeIntegration: true
        }
    };
    win = new electron_1.BrowserWindow(windowOpts);
    win.loadURL("file://" + __dirname + "/index.html");
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
