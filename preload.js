const { ipcRenderer, contextBridge } = require('electron')

// 最小化窗口
const handleMinimize = async () => {
    return await ipcRenderer.invoke('minimize')
}

// 关闭窗口
const handleClose = async () => {
    return await ipcRenderer.invoke('close')
}

// 导出pdf
const handleExportPdf = async (htmlContent, fileName) => {
    return await ipcRenderer.invoke('export-pdf', htmlContent, fileName)
}

// 导出html
const handleExportHtml = async (htmlContent, fileName) => {
    return await ipcRenderer.invoke('export-html', htmlContent, fileName)
}

contextBridge.exposeInMainWorld('renderApi', {
    handleMinimize,
    handleClose,
    handleExportPdf,
    handleExportHtml
})