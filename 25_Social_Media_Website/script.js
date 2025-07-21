// ========== SIDEBAR ==========
const menuItems = document.querySelectorAll('.menu-item');

const changeActiveItem = () => {
    menuItems.forEach(item => item.classList.remove('active'));
};

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');

        if (item.id === 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'none';
        }
    });
});





// ========== MESSAGES ==========
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// search chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
        chat.style.display = name.indexOf(val) !== -1 ? 'flex' : 'none';
    });
};

messageSearch.addEventListener('keyup', searchMessage);

// highlight messages when clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';

    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
});






// ========== THEME ==========
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');

// open theme modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
};

// close theme modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
};

theme.addEventListener('click', openThemeModal);
themeModal.addEventListener('click', closeThemeModal);



// ****** FONT SIZE ****** //
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');

const removeSizeSelector = () => {
    fontSizes.forEach(size => size.classList.remove('active'));
};

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        size.classList.add('active');

        let fontSize;
        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-10rem');
            root.style.setProperty('--sticky-top-right', '-33rem');
        }

        document.querySelector('html').style.fontSize = fontSize;
    });
});

// ****** PRIMARY COLOR ****** //
const colorPalette = document.querySelectorAll('.choose-color span');

const removeColorSelector = () => {
    colorPalette.forEach(color => color.classList.remove('active'));
};

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        removeColorSelector();                    
        color.classList.add('active');            

        let primaryHue;

        if (color.classList.contains('color-1')) primaryHue = 252;
        else if (color.classList.contains('color-2')) primaryHue = 52;
        else if (color.classList.contains('color-3')) primaryHue = 352;
        else if (color.classList.contains('color-4')) primaryHue = 152;
        else if (color.classList.contains('color-5')) primaryHue = 27;

        root.style.setProperty('--primary-color-hue', primaryHue);
    });
});




// ****** BACKGROUND COLOR ****** //
const bg1 = document.querySelector('.bg-1');
const bg2 = document.querySelector('.bg-2');
const bg3 = document.querySelector('.bg-3');

const changeBG = (darkColorLightness, whiteColorLightness, lightColorLightness) => {
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--light-color-lightness', lightColorLightness);
};

bg1.addEventListener('click', () => {
    bg1.classList.add('active');
    bg2.classList.remove('active');
    bg3.classList.remove('active');

    // Refresh page to default
    window.location.reload();
});

bg2.addEventListener('click', () => {
    changeBG('95%', '20%', '15%');
    bg2.classList.add('active');
    bg1.classList.remove('active');
    bg3.classList.remove('active');
});

bg3.addEventListener('click', () => {
    changeBG('95%', '10%', '0%');
    bg3.classList.add('active');
    bg1.classList.remove('active');
    bg2.classList.remove('active');
});