const fs = require('fs').promises
const path = require('path')

class FileOpr
{
    // 新建文件
    async createFile(filePath, content = '')
    {
        try {
            await fs.writeFile(filePath, content)
            return { success: true, message: 'File created successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error creating file', error }
        }
    }

    // 删除文件
    async deleteFile(filePath)
    {
        try {
            await fs.unlink(filePath)
            return { success: true, message: 'File deleted successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error deleting file', error }
        }
    }

    // 重命名文件
    async renameFile(oldPath, newPath)
    {
        try {
            await fs.rename(oldPath, newPath)
            return { success: true, message: 'File renamed successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error renaming file', error }
        }
    }

    // 读取文件内容
    async readFile(filePath)
    {
        try {
            const content = await fs.readFile(filePath, 'utf8')
            return { success: true, message: 'File read successfully', content }
        } catch (error)
        {
            return { success: false, message: 'Error reading file', error }
        }
    }

    // 写入文件内容（覆盖写入）
    async writeFile(filePath, content)
    {
        try {
            await fs.writeFile(filePath, content)
            return { success: true, message: 'File written successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error writing file', error }
        }
    }

    // 新建目录
    async createDirectory(dirPath)
    {
        try {
            await fs.mkdir(dirPath, { recursive: true })
            return { success: true, message: 'Directory created successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error creating directory', error }
        }
    }

    // 删除目录
    async deleteDirectory(dirPath)
    {
        try {
            await fs.rmdir(dirPath, { recursive: true })
            return { success: true, message: 'Directory deleted successfully' }
        } catch (error)
        {
            return { success: false, message: 'Error deleting directory', error }
        }
    }

    // 读取目录下全部.md文件
    async readMdFilesInDirectory(dirPath)
    {
        try {
            const files = await fs.readdir(dirPath)
            const mdFiles = files.filter(file => file.endsWith('.md'))
            return { success: true, message: 'MD files read successfully', mdFiles }
        } catch (error)
        {
            return { success: false, message: 'Error reading MD files', error }
        }
    }
}

module.exports = FileOpr