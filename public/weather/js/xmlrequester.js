function XMLRequesterMy(url) {
    const self = this;
    const arrReq = [];

    const xhr = new XMLHttpRequest();
    xhr.timeout = 3000; // (в миллисекундах)
    xhr.open('POST', url, true); // true – асинхронно
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    //xhr.send(body);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = JSON.parse(this.responseText);
            if (data.length !== 0) {
                console.log('onreadystatechange: ' + data);
            }
        }
    }

    xhr.ontimeout = function () {
        alert('Извините, запрос превысил максимальное время');
    }

    this.addRequest = function (params) {

    }
}