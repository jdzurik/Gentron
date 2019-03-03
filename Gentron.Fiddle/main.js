"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let win;
function createWindow() {
    const windowOpts = {
        height: 1080,
        width: 1920,
        webPreferences: {
            nodeIntegration: true
        }
    };
    win = new electron_1.BrowserWindow(windowOpts);
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
console.log('Dirname' + __dirname);
//# sourceMappingURL=main.js.map