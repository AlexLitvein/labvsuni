function CookiesMy () {
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

    this.CreateCookieString = function (name, obj, ageSec) {
        // return name + '=' + this.objToString(obj) + ';max-age=2592000';
        return name + '=' + JSON.stringify(obj) + ';max-age=' + ageSec;
    }

    this.GetData = function (name) {
        let obj = null;
        // Прежде всего необходимо получить список всех cookies,
        // принадлежащих этому документу.
        // Для этого следует прочесть содержимое свойства Document.cookie.
        const allcookies = document.cookie;
        // Если ни одного cookie не найдено, ничего не предпринимать.
        if (allcookies === '') return obj;

        // Разбить строку на отдельные cookies, а затем выполнить
        // цикл по всем полученным строкам в поисках требуемого имени.
        const cookies = allcookies.split(';');
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

    this.IsEnabled = function () {
        // Воспользоваться свойством navigator.cookieEnabled, если оно определено в броузере
        if (navigator.cookieEnabled !== undefined) return navigator.cookieEnabled;
        else return false;
        // Если значение уже было помещено в кэш, использовать это значение
        // if (Cookie.enabled.cache !== undefined) return Cookie.enabled.cache;
        // Иначе создать тестовый cookie с некоторым временем жизни
        // document.cookie = 'testcookie=test; maxage=10000'; // Установить cookie
        // Теперь проверить-был ли сохранен cookie-файл
        // const cookies = document.cookie;
        // if (cookies.indexOf('testcookie=test') === -1) {
        // Cookie не был сохранен
        //    return Cookie.enabled.cache = false;
        // } else {
        // Cookie был сохранен, поэтому его нужно удалить перед выходом
        //    document.cookie = 'testcookie=test; maxage=0'; // Удалить cookie
        //    return Cookie.enabled.cache = true;
        // }
    }
}
