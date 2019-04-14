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

export { randomAvatar }