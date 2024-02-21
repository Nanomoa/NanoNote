const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require("path");
const fs = require('fs')
const { FileOpr } = require('./dist/utils/FileOpr')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 1300,
        minHeight: 800,
        frame: false,
        transparent: true,
        backgroundColor:'rgba(0,0,0,0)',
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

    win.loadFile('./index.html').then((r) => {})

    win.on('resize', () =>
    {
        win.loadFile('./index.html').then((r) => {})
    })
}

app.whenReady().then(() =>
{
    // 首次进入创建数据目录
    const homeDir = app.getPath('home')
    const appRootDir = 'NanoNote'
    const appSubDir = ['Notes', 'Html', 'Pdf']
    const appRootPath = path.join(homeDir, appRootDir)

    if(!fs.existsSync(appRootPath))
    {
        fs.mkdirSync(appRootPath)
        appSubDir.forEach((dir) =>
        {
            let subDirPath = path.join(appRootPath, dir)
            if(!fs.existsSync(subDirPath))
            {
                fs.mkdirSync(subDirPath)
            }
        })
    }

    createWindow()

    app.on('activate', () =>
    {
        if(BrowserWindow.getAllWindows().length === 0)
        {
            createWindow()
        }
    })
})

app.on('window-all-closed', () =>
{
    if(process.platform !== 'darwin')
    {
        app.quit()
    }
})


/**
 * 目录常量
 */

// 系统用户目录
const homePath = app.getPath('home')
// 应用根目录
const appRootPath = path.join(homePath, 'NanoNote')
// 笔记目录
const appNotesPath = path.join(appRootPath, 'Notes')
// 默认展示笔记目录
const defaultAppNotePath = path.join(appNotesPath, 'default')
// 导出Html目录
const appHtmlPath = path.join(appRootPath, 'Html')
// 导出Pdf目录
const appPdfPath = path.join(appRootPath, 'Pdf')


// 窗口最小化
ipcMain.handle('minimize', (event) =>
{
    let window = BrowserWindow.getFocusedWindow()
    window.minimize()
})

// 关闭窗口
ipcMain.handle('close', (event) =>
{
    let window = BrowserWindow.getFocusedWindow()
    window.close()
})

// 导出Pdf
ipcMain.handle('export-pdf', (event, htmlContent, fileName) =>
{
    let previewWin = new BrowserWindow({
        show: false
    })

    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`

    previewWin.loadURL(dataUrl).then((r) => {})

    let replyMsg = ''

    previewWin.webContents.on('did-finish-load', async () =>
    {
        let pdfBuffer = await previewWin.webContents.printToPDF({

        })

        let fileOpr = new FileOpr()

        let exportPath = path.join(appPdfPath, fileName)

        if(fs.existsSync(exportPath))
        {
            replyMsg = '导出Pdf文件失败，已存在同名文件'
            return
        }

        let fileWriteRes = await fileOpr.writeFile(exportPath, pdfBuffer)

        if(fileWriteRes.success)
        {
            replyMsg = '导出Pdf文件完成'
        } else
        {
            replyMsg = '导出Pdf文件失败'
        }
    })

    return replyMsg
})

// 导出Html
ipcMain.handle('export-html',  async (event, htmlContent, fileName) =>
{
    let exportPath = path.join(appHtmlPath, fileName)

    if(fs.existsSync(exportPath))
    {
        return '导出Html文件失败，已存在同名文件'
    }

    let replyMsg = ''

    let fileOpr = new FileOpr()

    let fileWriteRes = await fileOpr.writeFile(exportPath, htmlContent)

    if(fileWriteRes.success)
    {
        replyMsg = '导出Html文件完成'
    } else
    {
        replyMsg = '导出Html文件失败'
    }

    return replyMsg
})

