const dateTimeFormat = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});


function dateToString(date) {
    return dateTimeFormat.format(date * 1000);
}

function getUserId() {
    return window.localStorage.getItem('userId');
}

function getUserName() {
    return window.localStorage.getItem('userName');
}

const headers = () => new Headers({
    'Content-Type': 'application/json',
    'Authorization': window.localStorage.getItem('accessToken')
})

const ajax = (url, options) => {
    const body = options?.body;
    const method = options?.method;

    return fetch(url, {method, body, headers: headers()});
}

function logout() {
    window.localStorage.clear();
    window.location.href = '/login';
}

function contextMenu(event) {
    if (event.target.classList.contains('ace_content')) {
        return;
    }
    event.preventDefault();
    const contextMenu = document.querySelector('#contextmenu');
    const {width: bodyWidth, height: bodyHeight} = globalThis.document.body.getBoundingClientRect();
    const {width: contextMenuWidth, height: contextMenuHeight} = contextMenu.getBoundingClientRect();

    if (contextMenuWidth + event.clientX > bodyWidth) {
        contextMenu.style.left = (event.clientX - contextMenuWidth) + 'px';
    } else {
        contextMenu.style.left = (event.clientX) + 'px';
    }

    if (contextMenuHeight + event.clientY > bodyHeight) {
        contextMenu.style.top = (event.clientY - contextMenuHeight) + 'px';
    } else {
        contextMenu.style.top = (event.clientY) + 'px';
    }
    removeSubSections();
    contextMenu.classList.add('active');
}

window.onload = () => {
    const contextmenu = document.querySelector('#contextmenu');

    window.addEventListener('contextmenu', contextMenu);
    window.addEventListener('click', (event) => {
        if (contextmenu.contains(event.target)) {
            return;
        }

        removeContextMenu(event.target);
    });

    contextmenu.querySelectorAll('.expandable').forEach(el => {
        el.addEventListener('mouseenter', (event) => {
            const subSection = el.querySelector('[role=list]')
            const {width: elWidth, left: elLeft, top: elTop} = el.getBoundingClientRect();
            const {width: bodyWidth, height: bodyHeight} = globalThis.document.body.getBoundingClientRect();
            const {
                width: subSectionWidth,
                height: subSectionHeight,
            } = subSection.getBoundingClientRect();

            if (subSectionWidth + elWidth + elLeft > bodyWidth) {
                subSection.style.left = 'unset';
                subSection.style.right = '100%'
                subSection.classList.remove('right');
                subSection.classList.add('left');
            } else {
                subSection.style.left = '100%'
                subSection.style.right = 'unset'
                subSection.classList.add('right');
                subSection.classList.remove('left');
            }

            if (subSectionHeight + elTop + 40 > bodyHeight) {
                subSection.style.bottom = '1px';
                subSection.style.top = 'unset';
            } else {
                subSection.style.bottom = 'unset'
                subSection.style.top = '-1px'
            }

            el.classList.add('visible');
        });

        el.addEventListener('mouseleave', (event) => {
            removeSubsection(el);
        });
    })

    window.addEventListener('resize', () => {
        removeContextMenu()
    });

}

function removeContextMenu() {
    document.querySelector('#contextmenu').classList.remove('active');
    removeSubSections();
}

function removeSubSections() {
    document.querySelector('#contextmenu').querySelectorAll('.expandable').forEach(el => {
        removeSubsection(el);
    });
}

function removeSubsection(expandableSection) {
    const subSection = expandableSection.querySelector('[role=list]');
    subSection.style.left = '99%';
    subSection.style.right = 'unset';
    subSection.style.bottom = 'unset'
    subSection.style.top = '-2px'
    expandableSection.classList.remove('visible');
}

function barrelRoll() {
    globalThis.document.body.style.transition = 'transform 4s linear';
    globalThis.document.body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        globalThis.document.body.style.transition = '';
        globalThis.document.body.style.transform = 'rotate(0)';
    }, 4000);
}