import {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    screen as screenObject,
} from 'electron';

ipcMain.on('open-directory', async (event, args: { inputId: string }) => {
    const directory = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    event.reply('directory-opened', {
        ...directory,
        ...args,
    });
});

function createWindow() {
    const { width, height } = screenObject.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width,
        height,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
