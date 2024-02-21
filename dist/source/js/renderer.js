const { HtmlSplice } = require('../../utils/HtmlSplice')

// 最小化窗口
async function minimizeWindow()
{
    return await renderApi.handleMinimize()
}

// 关闭窗口
async function closeWindow()
{
    return await renderApi.handleClose()
}

// 导出pdf
async function exportPdf(content, fileName)
{
    let htmlContent = (new HtmlSplice(content)).getRes()
    return await renderApi.handleExportPdf(htmlContent, fileName)
}

// 导出html
async function exportHtml(content, fileName)
{
    let htmlContent = (new HtmlSplice(content)).getRes()
    return await renderApi.handleExportHtml(htmlContent, fileName)
}