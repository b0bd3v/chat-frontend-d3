let randomAvatar = (id) => {
    const avatarList = [
        '/images/rooms/doge.jpg',
        '/images/rooms/cat.jpg',
        '/images/avatar/small/veronika.jpg',
        '/images/avatar/small/rachel.png',
        '/images/avatar/small/matthew.png',
        '/images/avatar/small/lindsay.png',
        '/images/avatar/small/jenny.jpg'
    ];
    
    const strNumber = id.toString();
    
    let number = strNumber.substring(strNumber.length -1, strNumber.length)
    
    while(number >= avatarList.length){
        number = (number - avatarList.length)
    }
    
    return avatarList[number];
}

let guid = function() {

    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
}

export { randomAvatar, guid}