let vditor = new Vditor('vditor', {
    "height": window.innerHeight - document.getElementById('title-input').offsetHeight - 120,
    "theme": "classic",
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

function toggleMod()
{
    let dayMod = document.getElementById('day-mod');
    let nightMod = document.getElementById('night-mod');
    if (dayMod.classList.contains('hidden'))
    {
        dayMod.classList.remove('hidden');
        nightMod.classList.add('hidden');
        document.body.setAttribute('data-theme', 'night')
        vditor.setTheme('dark', 'dark');
    } else
    {
        nightMod.classList.remove('hidden');
        dayMod.classList.add('hidden');
        document.body.setAttribute('data-theme', 'pastel')
        vditor.setTheme('classic', 'light');
    }
}

const buttons = document.querySelectorAll('.active-button');

function removeBorder()
{
    buttons.forEach(button => {
        button.classList.remove('border-2');
        button.classList.remove('border-blue-500');
    });
}

function addBorder(currentButton)
{
    removeBorder();
    currentButton.classList.add('border-2');
    currentButton.classList.add('border-blue-500');
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        addBorder(this);
    });
});