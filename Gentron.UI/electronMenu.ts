declare type TMetro = typeof import("metro4");
declare const Metro: TMetro;

import { Store } from "redux";
import { ActionCreators } from "./actions/Gentron";
import { IGentron, Gentron } from "../Gentron.Library";
import { IFileOperationResult } from "../Gentron.Library/results";
const { dialog, getCurrentWindow, Menu } = (window as any).require('electron').remote;

function saveInternal(state: IGentron) {
    const saveResult: IFileOperationResult<void> = Gentron.save(state);
    if (saveResult.IsError) {
        Metro.toast.create(saveResult.ErrorMessage, null, null, "warning");
    }
    else {
        Metro.toast.create("Saved Successfully!", null, null, "success");
    }
}

function save(store: Store<IGentron>): void {
    const state: IGentron = store.getState();

    if (!state.ActiveProjectPath || state.ActiveProjectPath.length === 0) {
        saveAs(store);
    }
    else {
        saveInternal(state);
    }
}

function saveAs(store: Store<IGentron>): void {
    dialog.showSaveDialog({
        title: "Gentron Save",
        filters: [
            { name: 'Gentron Project', extensions: ['gproj'] },
            { name: 'JSON', extensions: ['json'] }
        ]},
        function (fileName: string) {
            if (fileName && fileName.length > 0) {
                store.dispatch(ActionCreators.addOrUpdateActiveProjectPath(fileName));
                const state: IGentron = store.getState();
                saveInternal(state);
            }
        }
    );
}

function open(): void {

}

export default function setupMenu(store: Store<IGentron>): void {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        open();
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
        //{
        //    role: 'help',
        //    submenu: [
        //        {
        //            label: 'Learn More',
        //            click() {
        //                shell.openExternal('')
        //            }
        //        }
        //    ]
        //}
    ]));
}