let numberFilter = (num) => {
    if (!num) {
        return '0.000';
    } else if (Number(num)) {
        return Number(num).toFixed(3);
    } else {
        return '0.000';
    }
};

export default {
    numberFilter,
}


