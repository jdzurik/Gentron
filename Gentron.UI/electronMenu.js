"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Menu } = window.require('electron').remote;
function setupMenu() {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                    }
                },
                {
                    label: 'Save As',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click() {
                    }
                },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
    ]));
}
exports.default = setupMenu;
