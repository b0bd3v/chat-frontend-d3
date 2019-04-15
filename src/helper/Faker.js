let randomAvatar = (id) => {
    
    const avatarList = [
        '/images/rooms/doge.jpg',
        '/images/rooms/doge.gif',
        '/images/avatar/small/dogo1.jpg',
        '/images/avatar/small/dogo2.png',
        '/images/avatar/small/dogo3.jpg',
        '/images/avatar/small/dogo4.png',
    ];
    
    if(id === undefined || id === null) return avatarList[0];

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
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    guid += nav.productSub;
    guid += nav.userAgent.replace(/\D+/g, '');

    return guid;
}

export { randomAvatar, guid}