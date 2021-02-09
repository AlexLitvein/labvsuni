(function  (idParent) {
    // loadFile('/weather/css/chat.css', 'css');
    loadFile('weather/css/chat.css', 'css');  // for offline

    // loadFile('/weather/js/MyStyles.js', 'js');
    // loadFile('/weather/js/UIElements.js', 'js');

    const prntElm = document.getElementById('cont');
    // console.log('MyStyles');
    const uie = new UIElms();
    const controls = Object.create(null, {});

    ititUI();

    function addControl (child) {
        controls[child.name] = child;
        // parentEl.appendChild(child.elm());
    }

    function loadFile (path, type) {
        // console.log('loadFile' + path);
        let fileref = null;
        if (type === 'js') {
            fileref = document.createElement('script')
            fileref.setAttribute('type', 'text/javascript')
            fileref.setAttribute('src', path)
        } else if (type === 'css') {
            fileref = document.createElement('link')
            fileref.setAttribute('rel', 'stylesheet')
            fileref.setAttribute('type', 'text/css')
            fileref.setAttribute('href', path)
        }
        document.getElementsByTagName('head')[0].appendChild(fileref)
    }

    function createUser (name) {
        const cont = new uie.UICont(name, 'flxGrw', '80px');
        const lPan = new uie.UIImage('lPan', 'flxItCnt', '/weather/img/avat_01.png');
        const rPan = new uie.UICont('rPan', 'flxGrwCol');

        const rPanTop = new uie.UICont('rPanTop', 'flx', '16px');
        const rPanMid = new uie.UICont('rPanMid', 'flxGrw');
        const rPanBot = new uie.UICont('rPanBot', 'flx', '24px');
        rPan.addElm(rPanTop, rPanMid, rPanBot);

        const prmLegnd = [];
        prmLegnd.push(['lg1', '8888', 'lgndImg16']);
        prmLegnd.push(['lg2', '9999', 'lgndImg16', '16px', '0px']);
        prmLegnd.push(['lg3', '9999', 'lgndImg16', '32px', '0px']);
        // prmLegnd.push(['lg4', '9999', 'flxItCntGrw', '16px', '48px', '0px']);
        const lgnds = uie.UICreateMany(prmLegnd, uie.UILegendItem);
        rPanBot.addElm(...lgnds);

        cont.addElm(lPan, rPan);
        return cont;
    }

    function createMenu (name) {
        const cont = new uie.UICont(name, 'flxGrw', '32px');

        const ibut1 = new uie.UITextButton('ibut1', 'Add', 'btnInit', '', '52px');
        const ibut2 = new uie.UITextButton('ibut2', 'Reg', 'btnInit', '', '52px');
        cont.addElm(ibut1, ibut2);

        ibut1.elm().addEventListener('click', async function () {
        const response = await fetch('/weather/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify({ func: 'AddMsgz08Kw4fu', param: 'New message' })
            body: JSON.stringify({ f: 'AddMsgz08Kw4fu', params: ['userLogin', 'New message'] })
          });

          const result = await response.json();
          console.log('xmlreq: ' + result);
        });

        ibut2.elm().addEventListener('click', async function () {
            const response = await fetch('/weather/chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                // body: JSON.stringify({ func: 'AddMsgz08Kw4fu', param: 'New message' })
                body: JSON.stringify({ f: 'UserRegzd08hvlKhwfu', params: ['userLogin', 'password'] })
              });

              const result = await response.json();
              console.log('xmlreq: ' + result);
            });

        // ibut1.elm().addEventListener('click', function () {
        //     const body = 'func=' + 'AddMsgz08Kw4fu' + '&params=' + encodeURIComponent('New message');
        //     // 'startData=' + encodeURIComponent('New message') + '&range=' + encodeURIComponent(range);
        //     const xhr = new XMLHttpRequest();
        //     // xhr.timeout = 6000; // (в миллисекундах) не нужно
        //     xhr.open('POST', '/weather/chat', true); // true – асинхронно
        //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //     xhr.send(body);
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //             const data = JSON.parse(this.responseText);
        //             if (data.length !== 0) {
        //                 console.log('onreadystatechange: ' + data);
        //             }
        //         }
        //     }
        //     xhr.ontimeout = function () {
        //         alert('Извините, запрос превысил максимальное время');
        //       }
        // });

        return cont;
    }

    function outMsg1 (uid, msg) {
        const cont = new uie.UICont('outMsg', '');
        const sender = new uie.UICont('sender', 'flx'); //, '16px'
        cont.addElm(sender);

        const pSender = document.createElement('p');
        pSender.className = 'chatText';
        pSender.innerText = 'Sender: ' + uid;
        // sender.elm().appendChild(pSender);
        sender.addElm(pSender);

        const p = document.createElement('p');
        p.className = 'chatText';
        p.innerText = msg;
        // cont.elm().appendChild(p);
        cont.addElm(p);

        return cont;
    }

    function createMsgPan (h) {
        const cont = new uie.UICont('msgPan', 'flxGrwCol');
        const chatArea = new uie.UICont('chatArea', 'flxGrwCol');
        cont.addElm(chatArea);

        const inputMsg = new uie.UICont('inputMsg', 'flxCentH'); //, '36px'
        const textBox = document.createElement('textarea');
        textBox.style.minHeight = h;
        textBox.className = 'flxGrw';
        // inputMsg.elm().appendChild(textBox);
        inputMsg.addElm(textBox);
        const inputButt = new uie.UITextButton('inputButt', 'OK', 'btnInit', h, h);
        inputMsg.addElm(inputButt);
        cont.addElm(inputMsg);

        // temp
        const outMsg  = outMsg1(7878, 'В первые годы после появления язык JavaScript чаще всего использовался для создания маленьких и простых сценариев, встроенных прямо в вебстраницы.');
        chatArea.addElm(outMsg);

        return cont;
    }

    function createRegForm (caption) {
        const cont = new uie.UICont('contForm', 'dlgForm');

        // const labelLogin = uie.UICreateElement('span', 'Логин');
        // const inputLogin = document.createElement('input');
        // inputLogin.setAttribute('type', 'text');
        // cont.addElm(labelLogin, inputLogin);

        // const labelPass = uie.UICreateElement('span', 'Пароль');
        // const inputPass = document.createElement('input');
        // inputLogin.setAttribute('type', 'text');
        // cont.addElm(labelPass, inputPass);

        const login = new uie.UITextEditValid('login', 'Логин', '3-5 символов русского, латинского алфавита, цифры');
        const passw = new uie.UITextEditValid('passw', 'Пароль', '3-5 символов латинского алфавита, цифры');
        cont.addElm(login, passw);

        return cont;
    }

    function createCaptionPan (caption) {
        const cont = new uie.UICont('contCapt', 'captPan');
        const ico = new uie.UILegendItem('ico', caption, 'lgndImg16', '16px');
        cont.addElm(ico);
        const rButt = new uie.UIImgButton('rButt', 'btnInit', '-17px');
        cont.addElm(rButt);
        return cont;
    }

    function createDialog (params) {
        const popUpBody = new uie.UICont('popUpBody', 'popUpBody flxItCnt');
        const popUpCont = new uie.UICont('popUpCont', 'dialogCont');
        popUpBody.addElm(popUpCont);

        const capt = createCaptionPan('Hello! Caption!');
        const regForm = createRegForm();

        const buttPan = new uie.UICont('buttPan', 'flxItCnt');
        const butOk = new uie.UITextButton('butOk', 'Ок', 'btnInit', '', '52px');
        const butCancel = new uie.UITextButton('butCancel', 'Отмена', 'btnInit', '', '52px');
        buttPan.addElm(butOk, butCancel);

        popUpCont.addElm(capt, regForm, buttPan);
        return popUpBody;
    }

    function ititUI () {
        const bodyElm = new uie.UICont('body', 'myChatComm flxGrwCol', '100%');
        prntElm.appendChild(bodyElm.elm());
        addControl(bodyElm);

        const menu = createMenu('menu');
        const contUser = new uie.UICont('contUser', 'flxGrw', '100%');
        bodyElm.addElm(menu, contUser);

        const lPan = new uie.UICont('lPan', '', '', '250px');
        const rPan = new uie.UICont('rPan', 'flxGrwCol');
        contUser.addElm(lPan, rPan);

        const uicards = uie.UICreateMany([[], [], [], []], createUser);
        // const uicards = uie.UICreateMany([[]], createUser);
        lPan.addElm(...uicards);

        const msgInput = createMsgPan('32px');
        rPan.addElm(msgInput);

        // const dia = createDialog();
        // bodyElm.addElm(dia);

        // console.log(rPan);
        // const ibut1 = new uie.UIImgButton('ibut1', myStyles.brd1, 'url("avat_03.png")', '32px', '32px', '0px', '0px');
        // rPan.addElm(ibut1);
    }
})();
