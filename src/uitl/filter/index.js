let numberFilter = (num) => {
    if (!num) {
        return '0.000';
    } else if (Number(num)) {
        return Number(num).toFixed(3);
    } else {
        return '0.000';
    }
};


let tableFilter = (num) => {
    if (!num) {
        return '0.000';
    } else if((`${num}`).includes('~')){
        return num;
    }else if (Number(num) >= 0) {
        return Number(num).toFixed(3);
    } else if(Number(num) < 0){
        return "";
    } else if(typeof num === 'string' && (`${num}`).includes('~')){
        return num;
    }else {
        return '0.000';
    }
};

export default {
    numberFilter,
    tableFilter
}


