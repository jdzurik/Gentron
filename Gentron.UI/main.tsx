import { app, BrowserWindow } from "electron";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow;

function createWindow() {
    const windowOpts: Electron.BrowserWindowConstructorOptions = {
        height: 1080,
        width: 1920,
        webPreferences: {
            nodeIntegration: true
        }
    };

    win = new BrowserWindow(windowOpts);
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', (): void => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    console.log('Dirname' + __dirname);

    try {
        //  React
        BrowserWindow.addDevToolsExtension(
            'C:\\Users\\foleyt\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\3.4.2_0'
        );

        //  Redux
        BrowserWindow.addDevToolsExtension(
            'C:\\Users\\foleyt\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.15.3_0'
        );
    }
    catch (e) {
        console.log((e as NodeJS.ErrnoException).message);
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', (): void => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', (): void => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
console.log('Dirname' + __dirname);