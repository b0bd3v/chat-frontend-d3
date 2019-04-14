
let orderByDate = (data, fieldName, direction = 'desc') => {
    if(Array.isArray(data)){
        data.sort(function(a,b){
            let result;
            
            if(direction === 'desc') {
                result = new Date(b[fieldName]) - new Date(a[fieldName]);    
            } else if(direction === 'asc'){
                result = new Date(b[fieldName]) + new Date(a[fieldName]);
            }

            return result;            
        });  
    }    
    return data;
}

let findItemByAttribute = (data, fieldName, value) => {
    return data.find(
        item => item[fieldName] === value
    );
}

export { orderByDate, findItemByAttribute }