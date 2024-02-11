const invoke = window.__TAURI__.invoke;
const body = document.body;
const contextMenu = document.getElementById('contextMenu');

// 启动加载动画
setTimeout(() =>
{
    document.getElementById('loader-container').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}, 2000);

// 获取 main-content 高度
let mainContentHeight = document.getElementById('main-content').offsetHeight;

// 注册 Vditor 编辑器组件
let vditor = new Vditor('vditor', {
    "height": mainContentHeight,
    "theme": "light",
    "placeholder": "请输入正文",
    "tab": '\t',
    "cache": {
        "enable": true
    },
    "preview": {
        "theme": {
            "current": "light"
        },
        "hljs": {
            "enable": true,
            "style": "dracula",
            "lineNumber" : true
        },
        "markdown": {
            "toc": true,
            "mark": true
        }
    },
    "toolbar": [
    ],
    "outline": {
        "enable": true
    }
});

// 初始化列表
getNotes();

// ctrl + s 保存
document.addEventListener('keydown', function(event)
{
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    const isSPressed = event.key === 's';

    if(isCtrlPressed && isSPressed)
    {
        event.preventDefault();
        // todo
    }
});

// 笔记目录相关
// 绑定左键点击事件
function noteLeftClick(event)
{
    if (event.button === 0)
    {
        // todo
        alert('左键点击');
    }
}

// 绑定右键点击事件
function noteRightClick(event)
{
    event.preventDefault();
    showContextMenu(event.clientX, event.clientY);

    let dfs = (target) => {
        if(target && target.tagName !== 'BUTTON')
        {
            dfs(target.parentNode);
        }
        return target;
    };

    let targetElement = dfs(event.target);

    if(targetElement && targetElement.tagName === 'BUTTON')
    {
        let buttonId = targetElement.id;
        let noteIdElem = buttonId + "-id";
        let noteIdValue = document.getElementById(noteIdElem).value;
        console.log(noteIdValue);
    }

    // alert('右键点击');
}

// 点击任意位置隐藏右键目录
body.addEventListener('click', () =>
{
    hideContextMenu();
});

// 展示右键目录
function showContextMenu(x, y)
{
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.classList.remove('hidden');
}

// 隐藏右键目录
function hideContextMenu()
{
    contextMenu.classList.add('hidden');
}

// 关闭提示
function closeTips()
{
    let tipsElement = document.getElementById('tips');

    if(tipsElement)
    {
        tipsElement.style.display = 'none';
    }
}

// 禁止右键呼出默认菜单
body.addEventListener('contextmenu', function(event)
{
    event.preventDefault();
});

// Md文本导出Html
function exportHtml()
{
    invoke('md_to_html', {content: vditor.getHTML(), file_name: "output.html"});
}

// Md文本导出Pdf
function exportPdf()
{
    invoke('md_to_pdf', {content: vditor.getHTML(), file_name: "output.pdf"});
}

function getNotes()
{
    invoke('get_all_md_files').then(
        (files) => {
            let i = 1;
            let res = "";
            files.forEach(
                (file_path) => {
                    let arr = file_path.toString().split('/');
                    let path_to_user = '.../' + arr[arr.length - 3] + '/' + arr[arr.length - 2] + '/' +  arr[arr.length - 1];
                    let file_name = arr[arr.length - 1].split('.')[0];
                    let item = `
                    <button id="note-${i}" onclick="noteLeftClick(event)" oncontextmenu="noteRightClick(event)" class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                        <input id="note-${i}-id" type="text" hidden="hidden" readonly value="${file_path}">
                        <i class="fas fa-file-signature"></i>
                        <div class="text-left rtl:text-right">
                            <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">${file_name}</h1>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${path_to_user}</p>
                        </div>
                    </button>
                        `;
                    i++;
                    res += item;
                }
            );
            if(res === "")
            {
                res = `
                        <div class="text-center" style="text-align: center">
                            <h1 class="text-4xl font-bold"><i class="fas fa-file"></i> 您暂时没有笔记哦</h1>
                            <p class="text-gray-500">
                                点击上方 <i class="fas fa-plus"></i> 按钮新建笔记。
                            </p>
                        </div>
                    `;
            }
            res += `
                    <div id="tips" class="flex p-1.5  text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800" role="alert">
                        <div class="ms-3 text-sm font-medium">
                            提示：退出前记得<a href="#" class="font-semibold underline hover:no-underline">CTRL + S</a>保存您的笔记，左侧按钮可以把笔记导出为docx/pdf文件。(单击右侧按钮关闭提示)
                        </div>
                        <button id="close-tips" onclick="closeTips()" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                `;
            document.getElementById('note-list').innerHTML = res;
        }
    )
}