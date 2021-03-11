function printNiceDate (date) {
    date.niceFormat = '';
    date.niceFormat += date.getFullYear() + ' ';
    date.niceFormat += date.getMonth() + ' ';
    date.niceFormat += date.getDate() + ' ';
    console.log(date.niceFormat);
}
