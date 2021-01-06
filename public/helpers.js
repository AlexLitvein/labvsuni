class VisiterCounter {
    constructor () {
        // this.canadianDollar  =  canadianDollar;
        this.count = 0;
    }

    increment () {
        this.count++;
    }

    GetCount () {
        return this.count;
    }

    Reset () {
        this.count = 0;
    }

    GetName () {
        return 'VisiterCounter';
    }
}

// function CookiesMy (params) {
class CookiesMy {
    constructor () {
        // this.canadianDollar  =  canadianDollar;
        this.count = 0;

        // this.objToString = function (obj) {
        //     let sObj = '{';
        //     for (const prop in obj) {
        //         sObj += '"' + prop + '"' + ':' + obj[prop] + ',';
        //     }
        //     return sObj.substr(0, sObj.length - 1) + '}';
        // };

        this.objToString = function (obj) {
            let sObj = '{';
            for (const prop in obj) {
                if (typeof (obj[prop]) === 'object') {
                    sObj += '"' + prop + '"' + ':' + this.objToString(obj[prop]) + ',';
                } else
                if (typeof (obj[prop]) === 'string') {
                    sObj += '"' + prop + '"' + ':' + '"' + obj[prop] + '"' + ',';
                } else sObj += '"' + prop + '"' + ':' + obj[prop] + ',';
            }
            return sObj.substr(0, sObj.length - 1) + '}';
        };
    }

    CreateCookieString (name, obj) {
        // const cook = name + '=' + this.objToString(obj) + ';max-age=2592000';
        // document.cookie = cook;
        return name + '=' + this.objToString(obj) + ';max-age=2592000';
    }

    GetData (name, cookieIn) {
        let obj = null;
        // Прежде всего необходимо получить список всех cookies,
        // принадлежащих этому документу.
        // Для этого следует прочесть содержимое свойства Document.cookie.
        // const allcookies = document.cookie;
        // Если ни одного cookie не найдено, ничего не предпринимать.
        // if (allcookies === '') return obj;

        // Разбить строку на отдельные cookies, а затем выполнить
        // цикл по всем полученным строкам в поисках требуемого имени.
        const cookies = cookieIn.split(';');
        let cookie = null;
        for (let i = 0; i < cookies.length; i++) {
            // Начинается ли текущая строка cookie с искомого имени?
            if (cookies[i].substring(0, name.length + 1) === (name + '=')) {
                cookie = cookies[i];
                break;
            }
        }
        // Если cookie с требуемым именем не найден, вернуть управление
        if (cookie == null) return obj;
        // Значение cookie находится вслед за знаком равенства
        const cookieval = cookie.substring(name.length + 1);
        obj = JSON.parse(cookieval);

        return obj;
    }

    GetName () {
        return 'CookiesMy';
    }
}

 module.exports = { VisiterCounter, CookiesMy };
