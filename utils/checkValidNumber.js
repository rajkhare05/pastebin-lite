const isValidNumber = (num) => {
    return num != null && !isNaN(parseInt(num)) && isFinite(num);
}

export { isValidNumber };

