function MyWebApp (bodyElm) {
    let initialized = false;
    const mBodyElm = bodyElm; // не доступна из вне
    // const mName = 'MyWebApp';
    // const mArrRequestData = null;
    let mArrDbData = null;
    // const mGraph = new Mg($('canvas')[0].getContext('2d'), 30, 30, 720, 720);
     const mGraph = new MyGraph($('canvas')[0].getContext('2d'), 30, 30, 720, 720);
    // const mychat1 = new chat('panR');
    // const viscnt = new VisiterCounter();
    const mCookie = new CookiesMy();

    // const nextButt = $(mBodyElm).find('#startButt');
    const selDataObj = $(mBodyElm).find('#selDate');
    const rangeObj = $(mBodyElm).find('#selRange');

    const panLeft = $(mBodyElm).find('#panL');
    const panRight = $(mBodyElm).find('#panR');
    const domCanv1 = document.getElementById('canv1'); // $(mBodyElm).find('#canv1');
    const domTinfo = document.getElementById('tinfo');
    // domTinfo.style.left = domCanv1.offsetLeft + 'px';
    // domTinfo.style.top = domCanv1.offsetTop + 'px';

    let currAngle = 0;

    let drawOpt = {};
    // {
    //     p: { clr: '#00ff35', bDraw: true },
    //     t: { clr: '#C86F32', bDraw: true },
    //     h: { clr: '#00FFFF', bDraw: true }
    // };

    function setOpt (opt) {
        drawOpt = opt;
    }

    // function createDbFakeData()
    // {
    //     let arrData = new Array();
    //     let data = new Date("12/31/2019"); // м/д/г !!!! январь = 0, декабрь = 11
    //     data.setHours(23, 0, 0);
    //     //console.log(data);
    //     for (let i = 0; i < (365 * 24) + 1; i++) {
    //         var fakeData = {data: 0, temp: 0, p: 0, hg: 0}; // именно в теле цикла!!!
    //         data.setHours(data.getHours() + 1);
    //         //console.log(data.getMonth());
    //         fakeData.data =  ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;
    //         //fakeData.data =  ("0" + data.getDate()).slice(-2) + "/" + data.getMonth() + "/" + data.getFullYear() % 100 + "/" + data.getHours();
    //         fakeData.temp = (Math.random() * 100) - 50;
    //         fakeData.p = 600 + (Math.random() * 350);
    //         fakeData.hg = (Math.random() * 100);
    //         arrData.push(fakeData);
    //     }
    //     m_arrDbData = arrData;
    // }

    // --------------------------self init---------------------------------

    // createDbFakeData();

    // --------------------------return---------------------------------
    const obj = {

        init: function () {
            if (initialized) {
                return;
            }

            //

            // document.onmousemove = function (e) {
            //     curx = e.pageX;
            //     cury = e.pageY;
            // }

            let xpos = domTinfo.offsetLeft;
            let ypos = domTinfo.offsetTop;
            domCanv1.addEventListener('mousemove', function (event) {
                if (event.buttons === 1) {
                    const x = xpos += event.movementX;
                    const y = ypos += event.movementY;
                    // if (x > ) {
                    // const curx = event.offsetX;
                    // const cury = event.offsetY;

                    // const curx = x;
                    // const cury = y;
                    const gsize = mGraph.GetGraphSize();
                    const gorig = mGraph.GetOrigin();
                    // const rngP = 100; // 700-800
                    // const magic = (720 - cury - gorig.origY) * (rngP / gsize.h);
                    // const p = ((720 - cury - gorig.origY) * (rngP / gsize.h) + 700).toFixed(1);
                    // const t = (((720 - cury - gorig.origY) * (100 / gsize.h)) - 50).toFixed(1);
                    // const h = ((720 - cury - gorig.origY) * (100 / gsize.h)).toFixed(1);

                    const magic = (720 - y - gorig.origY) * (100 / gsize.h);
                    const p = (magic + 700).toFixed(1);
                    const t = ((magic) - 50).toFixed(1);
                    const h = (magic).toFixed(1);

                    // }
                    // domTinfo.style.left = (xpos += event.movementX)  + 'px';
                    // domTinfo.style.top = (ypos += event.movementY) + 'px';
                    domTinfo.style.left = x  + 'px';
                    domTinfo.style.top = y + 'px';

                    // const msg0 = 'p: ' + p + '<br>t: ' + t + '<br>h: ' + h;
                    // const msg1 = ' offsetY: ' + event.offsetY + '';
                    const infParam = document.getElementById('infParam');
                    infParam.innerHTML = 'p: ' + p + '<br>t: ' + t + '<br>h: ' + h;// + msg1;
                // domTinfo.style.left = event.offsetX  + 'px';
                // domTinfo.style.top = event.offsetY + 'px';
                }
            });

            const currDate = new Date();
            const toffs =  currDate.getTimezoneOffset();
            currDate.setHours(currDate.getHours() - toffs / 60);
            // элемнт input date при установке отнимает текущ таймофсет от входного
            // значения (день может измениться!), а отображает - этот день плюс тупо
            // местн таймофсет, поэтому время будет всегда = вр по гринвичу + текущ таймофсет
            selDataObj[0].valueAsDate = currDate;
             // selDataObj.val(currDate);
            // selDataObj[0].valueAsNumber = Date.now();
            // $(mBodyElm).find('#selDate')[0].valueAsDate = currDate;

            // TODO: Выровнять инфо по правому краю родителя
            $(mBodyElm).on('mouseenter mouseleave', '#idNotes', function (evt) {
                // console.log('mouse');
                if (evt.type === 'mouseenter') {
                    // console.log('mouseenter');
                    $(evt.target).children('.overlay').slideDown('fast');
                } else {
                    // console.log('mouse else');
                    $('#idNotes').children('.overlay').slideUp('fast');
                }
            });

            $(mBodyElm).find('#startButt').click(
                function (evt) {
                    // evt.preventDefault(); // если раскоментировать то будет проходить валидация формы при отправке, но ...
                    this.requestSensDataUrlencoded(selDataObj.val(), rangeObj.val());
                }.bind(this)
            );

            $(mBodyElm).find('#btnSet').click(
                function (evt) {
                    this.setDrawOptFromElm();
                    this.Draw();
                    // console.log('setDrawOptFromElm');
                }.bind(this)
            );

            $(mBodyElm).find('#relBtn').click(
                function (evt) {
                    currAngle += 360;
                    $(evt.target).css('transform', 'rotate(' + currAngle + 'deg)');
                    this.reqCurrSensDataUrlencoded();
                }.bind(this)
            );

            $(mBodyElm).find('#btnPrev, #btnNext').click(
                function (evt) {
                    let incRange = parseInt(rangeObj.val());
                    if (evt.target.id === 'btnPrev') {
                        // console.log(typeof (evt.target.id));
                        incRange = -incRange;
                    }

                    const dt = new Date(selDataObj.val());
                    dt.setDate(dt.getDate() + incRange);
                    // преобр в DOM объект, jquery объект не устанавл знач в DOM  объекте???
                    selDataObj[0].valueAsDate = new Date(dt);
                    this.requestSensDataUrlencoded(dt.toDateString(), rangeObj.val());
                }.bind(this)
            );

            $(mBodyElm).find('#panButL, #panButR').click(
                function (evt) {
                    let trgt = panLeft;
                    if (evt.target.id === 'panButR') {
                        trgt = panRight;
                    }

                    const displ = $(trgt).css('display');
                    if (displ === 'none') {
                        $(trgt).css('display', 'initial');
                    } else {
                        $(trgt).css('display', 'none');
                    }
                }
            );

            this.setDrawOptFromCookie();
            this.requestSensDataUrlencoded(selDataObj.val(), rangeObj.val());
            initialized = true;
        },

        Draw: function () {
            mGraph.drawGraph(mArrDbData, rangeObj.val());
        },

        requestSensDataForm: function () {
            const formData = new FormData(document.forms[0]);
            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000; // (в миллисекундах)
            xhr.open('POST', '/weather/getSensData', true);
            xhr.send(formData);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    // получить результат из this.responseText или this.responseXML
                    mArrDbData = JSON.parse(this.responseText);
                    // console.log('m_arrDbData: %f', mArrDbData[0].p);
                }
            }
        },

        requestSensDataUrlencoded: function (data, range) {
            // if (document.forms[0].checkValidity()) {
            const body = 'startData=' + encodeURIComponent(data) +
                '&range=' + encodeURIComponent(range);
            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000; // (в миллисекундах)
            xhr.open('POST', '/weather/getSensData', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    mArrDbData = JSON.parse(this.responseText);
                    if (mArrDbData.llength !== 0) {
                        // console.log('m_arrDbData: %f', m_arrDbData[0].p);

                        // Draw();
                        mGraph.drawGraph(mArrDbData, parseInt(range));
                    }
                }
            }
            // }
        },

        setDrawOptFromElm: function () {
            const arrItems = $(mBodyElm).find('.clrInput');
            const arrChkBox = $(mBodyElm).find('input[type="checkbox"]');

            drawOpt.p.clr = arrItems[0].value;
            drawOpt.t.clr = arrItems[1].value;
            drawOpt.h.clr = arrItems[2].value;

            drawOpt.p.bDraw = arrChkBox[0].checked;
            drawOpt.t.bDraw = arrChkBox[1].checked;
            drawOpt.h.bDraw = arrChkBox[2].checked;

            // console.log('cookie enabled? ' + mCookie.IsEnabled());
            const sCook = mCookie.CreateCookieString('drawData', drawOpt);
            // console.log(sCook);
            document.cookie = sCook;

            mGraph.setDrawOpt(drawOpt);
            // this.Draw();

            // console.log(arrItems[0].value);
            // console.log(arrChkBox[0].checked);
        },

        setDrawOptFromCookie: function (opt) {
            const drawOptFromCookie = mCookie.GetData('drawData');
            if (drawOptFromCookie != null) {
                // console.log(drawOptFromCookie);
                setOpt(drawOptFromCookie);
                // this.drawOpt = drawOptFromCookie;

                const arrItems = $(mBodyElm).find('.clrInput');
                const arrChkBox = $(mBodyElm).find('input[type="checkbox"]');

                arrItems[0].value = drawOpt.p.clr;
                // $(arrItems[0]).val(drawOpt.p.clr);
                arrItems[1].value = drawOpt.t.clr;
                arrItems[2].value = drawOpt.h.clr;

                arrChkBox[0].checked = drawOpt.p.bDraw;
                arrChkBox[1].checked = drawOpt.t.bDraw;
                arrChkBox[2].checked = drawOpt.h.bDraw;

                mGraph.setDrawOpt(drawOpt);
            }
        },

        reqCurrSensDataUrlencoded: function () {
            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000; // (в миллисекундах)
            xhr.open('POST', '/weather/getCurrSensData', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    const currSensData = JSON.parse(this.responseText);
                    if (currSensData.length !== 0) {
                        // const hdText = $(mBodyElm).find('#idhd');
                        $(mBodyElm).find('#idhd').html('сейчас<br>влажность ' + currSensData[0].h + ' %<br>атм. давл. ' + currSensData[0].p + ' мм рт.ст.');

                        let strT = currSensData[0].t.toString();
                        if (currSensData[0].t > 0) {
                            strT = '+' + strT;
                        }
                        $(mBodyElm).find('#tmp').html(strT);
                        // $(mBodyElm).find('#tmp').html(currSensData[0].t);

                        // console.log(currSensData[0].h);
                    }
                }
            }
        },

        requestSensDataJSON: function () {
            // var formData = new FormData(document.forms[0]);
            // var xhr = new XMLHttpRequest();
            // xhr.timeout = 3000; // (в миллисекундах)
            // xhr.open('POST', '/weather/getSensData', true);
            // xhr.send(formData);

            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //         // получить результат из this.responseText или this.responseXML
            //         m_arrDbData = JSON.parse(this.responseText);
            //         console.log('m_arrDbData: %f', m_arrDbData[0].p);
            //     }
            // }
        },

        requestSensData: function () {
            // TODO: заменить на переменные модуля
            const sData = $(mBodyElm).find('#selDate').val(); // гггг-мм-дд
            const range = $(mBodyElm).find('#selRange').val();

            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000; // (в миллисекундах)
            xhr.open('POST', '/weather/getSensData', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send('dt=${sData}&rng=${range}');

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    // получить результат из this.responseText или this.responseXML
                    mArrDbData = JSON.parse(this.responseText);
                    console.log('m_arrDbData: %f', mArrDbData[0].p);
                }
            }
        },

        // requestData(sData, nRange) { // гггг-мм-дд на входе из Html элемента DataPicker
        //     nRange = (nRange * 24) + 1;
        //     let arrReqData = new Array();
        //     let bStartAdd = false;
        //     if(m_arrDbData.length !== 0)
        //     {
        //     }
        //     let data = new Date(sData);
        //     data.setHours(0);
        //     let sDataFind = ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;

        //     for (let i = 0; i < m_arrDbData.length; i++) {

        //         if(m_arrDbData[i].data === sDataFind)
        //         {
        //             bStartAdd = true;
        //             //console.log(m_arrDbData[i].data + "idx: " + i);
        //         }

        //         if(bStartAdd && nRange)
        //         {
        //             var fakeData = {data: 0, temp: 0, p: 0, hg: 0}; // именно в теле цикла!!!
        //             fakeData.data = m_arrDbData[i].data;
        //             fakeData.temp = m_arrDbData[i].temp;
        //             fakeData.p = m_arrDbData[i].p;
        //             fakeData.hg = m_arrDbData[i].hg;
        //             arrReqData.push(fakeData);
        //             nRange--;
        //         }
        //     }
        //     m_arrRequestData = arrReqData;
        // },

        recurFunc: function (lvl, p, cnt) {
            if (p.lvl < lvl) {
                while (p.nCh < cnt) {
                    const n = new myNode();
                    n.p = p;
                    n.lvl = p.lvl + 1;
                    p.nCh += 1;
                    // console.log("ToDo lvl %d, node %d", n.lvl, p.nCh);

                    const newDiv = $('<div>').append('Div lvl: ' + n.lvl + ', id: ' + p.nCh);

                    newDiv.attr('style', 'background:#' + ((1 << 24) * Math.random() | 0).toString(16));
                    $(n.p.div).append(newDiv);
                    n.div = newDiv;

                    this.recurFunc(lvl, n, cnt);
                }
            }
        }
    };
    return obj;
}

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
        // return name + '=' + this.objToString(obj) + ';max-age=2592000';
        return name + '=' + JSON.stringify(obj) + ';max-age=2592000';
    }

    GetData (name) {
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

    IsEnabled () {
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
