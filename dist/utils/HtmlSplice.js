class HtmlSplice
{
    constructor(content)
    {
        this.content = content
    }

    getRes()
    {
        let header = `
<!DOCTYPE html><head><link rel="stylesheet" type="text/css" href="https://ld246.com/js/lib/vditor/dist/index.css"/>
<script src="https://ld246.com/js/lib/vditor/dist/js/i18n/zh_CN.js"></script>
<script src="https://ld246.com/js/lib/vditor/dist/method.min.js"></script></head>
<body><div class="vditor-reset" id="preview">
        `
        let footer = `
</div>
<script>
    const previewElement = document.getElementById('preview')
    Vditor.setContentTheme('light', 'https://ld246.com/js/lib/vditor/dist/css/content-theme');
    Vditor.codeRender(previewElement);
    Vditor.highlightRender({"enable":true,"lineNumber":false,"defaultLang":"","style":"github"}, previewElement, 'https://ld246.com/js/lib/vditor');
    Vditor.mathRender(previewElement, {
        cdn: 'https://ld246.com/js/lib/vditor',
        math: {"engine":"KaTeX","inlineDigit":false,"macros":{}},
    });
    Vditor.mermaidRender(previewElement, 'https://ld246.com/js/lib/vditor', 'classic');
    Vditor.markmapRender(previewElement, 'https://ld246.com/js/lib/vditor', 'classic');
    Vditor.flowchartRender(previewElement, 'https://ld246.com/js/lib/vditor');
    Vditor.graphvizRender(previewElement, 'https://ld246.com/js/lib/vditor');
    Vditor.chartRender(previewElement, 'https://ld246.com/js/lib/vditor', 'classic');
    Vditor.mindmapRender(previewElement, 'https://ld246.com/js/lib/vditor', 'classic');
    Vditor.abcRender(previewElement, 'https://ld246.com/js/lib/vditor');
    Vditor.mediaRender(previewElement);
    Vditor.speechRender(previewElement);
</script>
<script src="https://ld246.com/js/lib/vditor/dist/js/icons/ant.js"></script></body></html>
        `
        return header + this.content + footer
    }
}

module.exports = HtmlSplice