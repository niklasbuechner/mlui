const { app, BrowserWindow, screen: screenObject } = require('electron');

function createWindow() {
    const { width, height } = screenObject.getPrimaryDisplay().workAreaSize

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
