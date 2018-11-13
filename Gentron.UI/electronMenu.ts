﻿declare type TMetro = typeof import("metro4");
declare const Metro: TMetro;

const { dialog, Menu } = (window as any).require('electron').remote;
import { ActionCreators } from "./actions/Gentron";
import { GentronActionNames } from "./constants/ActionNames";
import { Result, TGentronFsResult } from "../Gentron.Library/results";
import { IGentron, Gentron, Utilities } from "../Gentron.Library";
import { Store } from "redux";

function saveInternal(state: IGentron) {
    const writeResult: Result<TGentronFsResult> = Gentron.save(state);
    if (writeResult.IsError) {
        Metro.toast.create(writeResult.ErrorMessage, null, 7500, "alert");
    }
    else if (Utilities.hasStringValue(writeResult.Result.InfoMessage)) {
        Metro.toast.create(writeResult.Result.InfoMessage, null, 7500, "warning");
    }
    else {
        Metro.toast.create("Saved Successfully!", null, 3000, "success");
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

function open(store: Store<IGentron>): void {
    dialog.showOpenDialog({
            title: "Gentron Open",
            filters: [
                { name: 'Gentron Project', extensions: ['gproj'] },
                { name: 'JSON', extensions: ['json'] }
            ]
        },
        function (filePaths: string[]) {
            if (filePaths && filePaths.length > 0) {
                const readResult: Result<TGentronFsResult> = Gentron.open(filePaths[0]);
                if (readResult.IsError) {
                    Metro.toast.create(readResult.ErrorMessage, null, null, "warning");
                    return;
                }
                else if (Utilities.hasStringValue(readResult.Result.InfoMessage)) {
                    Metro.toast.create(readResult.Result.InfoMessage, null, 7500, "warning");
                }
                else {
                    store.dispatch({
                        newState: readResult.Result.Gentron,
                        type: GentronActionNames.OpenProject,
                    });
                }
            }
        }
    );
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