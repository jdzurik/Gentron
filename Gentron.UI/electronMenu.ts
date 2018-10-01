import { Menu, shell } from "electron";
//import { Gentron } from "../Gentron.Library/Gentron";

export default function setupMenu(): void {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        //Gentron.open();
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click() {
                        //Gentron.save();
                    }
                },
                {
                    label: 'Save As',
                    click() {
                        //Gentron.saveAs();
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
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('')
                    }
                }
            ]
        }
    ]));
}