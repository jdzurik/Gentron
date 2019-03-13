'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const lib_1 = require("vue-cli-plugin-electron-builder/lib");
const isDevelopment = process.env.NODE_ENV !== 'production';
let win;
electron_1.protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST)
            win.webContents.openDevTools();
    }
    else {
        lib_1.createProtocol('app');
        win.loadURL('app://./index.html');
    }
    win.on('closed', () => {
        win = null;
    });
}
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
electron_1.app.on('ready', () => __awaiter(this, void 0, void 0, function* () {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            yield lib_1.installVueDevtools();
        }
        catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
}));
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                electron_1.app.quit();
            }
        });
    }
    else {
        process.on('SIGTERM', () => {
            electron_1.app.quit();
        });
    }
}
//# sourceMappingURL=background.js.map