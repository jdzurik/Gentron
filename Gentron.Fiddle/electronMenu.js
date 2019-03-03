"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialog, Menu } = window.require('electron').remote;
const Gentron_Library_1 = require("../Gentron.Library");
function saveInternal(state) {
    const writeResult = Gentron_Library_1.Gentron.save(state);
    if (writeResult.IsError) {
        Metro.toast.create(writeResult.ErrorMessage, null, 7500, 'alert');
    }
    else if (Gentron_Library_1.ObjectUtils.hasStringValue(writeResult.Result.InfoMessage)) {
        Metro.toast.create(writeResult.Result.InfoMessage, null, 7500, 'warning');
    }
    else {
        Metro.toast.create('Saved Successfully!', null, 3000, 'success');
    }
}
function save(store) {
}
function saveAs(store) {
    dialog.showSaveDialog({
        title: 'Gentron Save',
        filters: [
            { name: 'Gentron Project', extensions: ['gproj'] },
            { name: 'JSON', extensions: ['json'] }
        ]
    }, function (fileName) {
        if (fileName && fileName.length > 0) {
        }
    });
}
function open(store) {
    dialog.showOpenDialog({
        title: 'Gentron Open',
        filters: [
            { name: 'Gentron Project', extensions: ['gproj'] },
            { name: 'JSON', extensions: ['json'] }
        ]
    }, function (filePaths) {
        if (filePaths && filePaths.length > 0) {
            const readResult = Gentron_Library_1.Gentron.open(filePaths[0]);
            if (readResult.IsError) {
                Metro.toast.create(readResult.ErrorMessage, null, null, 'warning');
                return;
            }
            else if (Gentron_Library_1.ObjectUtils.hasStringValue(readResult.Result.InfoMessage)) {
                Metro.toast.create(readResult.Result.InfoMessage, null, 7500, 'warning');
            }
            else {
            }
        }
    });
}
function setupMenu(store) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        open(store);
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                        save(store);
                    }
                },
                {
                    label: 'Save As',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click() {
                        saveAs(store);
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
//# sourceMappingURL=electronMenu.js.map