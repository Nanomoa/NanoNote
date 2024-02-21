<div align="center">
<table align="left">
  <tr>
    <td><img src="https://img2.imgtp.com/2024/02/21/B7qlGwfi.png" alt="图片3" width="200"/></td>
    <td><img src="https://img2.imgtp.com/2024/02/21/JcTS3Qvc.png" alt="图片4" width="200"/></td>
  </tr>
  <tr>
    <td><img src="https://img2.imgtp.com/2024/02/21/khpiSrre.png" alt="图片1" width="200"/></td>
    <td><img src="https://img2.imgtp.com/2024/02/21/2vhD7hLI.png" alt="图片2" width="200"/></td>
  </tr>
</table>

# NanoNote

![GitHub Repo stars](https://img.shields.io/github/stars/Nanomoa/NanoNote) &nbsp;
![GitHub repo size](https://img.shields.io/github/repo-size/Nanomoa/NanoNote)


<br>

## A cross-platform WYSIWYG markdown text editor based on the Electron framework.

</div>

<br><br>

## Description
**NanoNote** is a cross-platform WYSIWYG Markdown text editor based on the Electron framework. The core of the editor is based on the Vditor editor, with a powerful set of features including but not limited to outlining, mathematical formulas, brain maps, diagrams, flowcharts, Gantt charts, timing charts, quintiles, title anchors, code highlighting, Graphviz rendering, PlantUML UML diagrams, task lists, etc. NanoNote also provides real-time caching to prevent accidental loss of editorial content, and pasting HTML is automatically converted to Markdown format, making the editing process more efficient. NanoNote also provides a real-time caching feature to prevent accidental loss of editing content, and automatic conversion of pasted HTML to Markdown format to make the editing process more efficient. In addition, the editor supports easy export of Markdown files to HTML pages and PDF files, providing flexible document output options to meet different user needs.

## Build
1. Clone the github repository locally.
   ```
   git clone https://github.com/Nanomoa/NanoNote.git
   ``` 
2. Open the repository you just cloned locally in an editor (e.g. VSCode, WebStorm)
3. Install the required packages with npm
   ```
   npm install
   ```
4. Run the project
   ```
   npm start
   ```

## Tips
The export pdf function relies on `html2pdf` and `headless_chromium` to realize, please make sure that **Google Chrome / Chrominum / Microsoft Edge** (one of the three can be) is installed on your machine.


## 介绍
**NanoNote** 是一款跨平台的所见即所得的 Markdown 文本编辑器，采用 Rust 语言结合 Tauri 框架进行开发。编辑器核心基于 [Vditor](https://github.com/Vanessa219/vditor) 编辑器，具备强大的功能集合，包括但不限于大纲、数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、标题锚点、代码高亮、Graphviz 渲染、PlantUML UML 图、任务列表等。NanoNote 还提供实时缓存功能，以防止意外丢失编辑内容，粘贴 HTML 自动转换为 Markdown 格式，使用户在编辑过程中更加高效。此外，编辑器支持将 Markdown 文件轻松导出为 HTML 页面以及 PDF 文件，提供了灵活的文档输出选项，以满足用户不同的需求。

## 构建
1. 克隆仓库到本地
```
git clone https://github.com/Nanomoa/NanoNote.git
``` 
2. 使用RustRover打开克隆的项目
3. 刷新 `src-tauri/Cargo.toml` 加载依赖
4. 运行项目
```
cargo tauri dev
```
## 提示
导出pdf功能依赖 `html2pdf` 和 `headless_chromium` 实现，请先确认本机已经安装 **Google Chrome / Chrominum / Microsoft Edge** （三者之一即可）。

## 注意
本项目目前处于开发阶段：
- [x] 集成 Vditor 编辑器
- [x] 导出为 Html 单页
- [x] 导出为 Pdf 文件
- [x] 获取 & 刷新笔记列表
- [x] 新建笔记
- [ ] 重命名笔记
- [ ] 删除笔记
- [ ] 合并多个笔记并导出


[![Stargazers repo roster for @Nanomoa/NanoNote](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=Nanomoa&repo=NanoNote)](https://github.com/Nanomoa/NanoNote)
