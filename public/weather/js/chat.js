(function (idParent) {
    // loadFile('/weather/css/chat.css', 'css');
    loadFile('weather/css/chat.css', 'css');  // for offline

    // loadFile('/weather/js/MyStyles.js', 'js');
    // loadFile('/weather/js/UIElements.js', 'js');

    const topParent = document.getElementById('cont');
    // console.log('MyStyles');
    const uie = new UIElms();
    const controls = Object.create(null, {});

    ititUI();

    function addCtrl (uiName) {
        controls[uiName.name()] = uiName;
        // console.log(child.name());
        // console.log(controls);
        // parentEl.appendChild(child.elm());
    }
    function remCtrl (uiName) {
        const elm = controls[uiName];
        const prnt = elm.elm().parentElement;
        prnt.removeChild(elm.elm());
        delete controls.uiName;
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
        const lPan = new uie.UIImage('lPan', 'flxCnt', '/weather/img/avat_01.png');
        const rPan = new uie.UICont('rPan', 'flxGrwCol');

        const rPanTop = new uie.UICont('rPanTop', 'flx', '16px');
        const rPanMid = new uie.UICont('rPanMid', 'flxGrw');
        const rPanBot = new uie.UICont('rPanBot', 'flx', '24px');
        rPan.addElm(rPanTop, rPanMid, rPanBot);

        const prmLegnd = [];
        prmLegnd.push(['lg1', '8888', 'lgndImg16']);
        prmLegnd.push(['lg2', '9999', 'lgndImg16', '16px', '0px']);
        prmLegnd.push(['lg3', '9999', 'lgndImg16', '32px', '0px']);
        // prmLegnd.push(['lg4', '9999', 'flxCntGrw', '16px', '48px', '0px']);
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
            const dia = createDialog();
            controls.body.addElm(dia);
            addCtrl(dia);

            // const response = await fetch('/weather/chat', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
            //     body: JSON.stringify({ f: 'AddMsgz08Kw4fu', params: ['userLogin', 'New message'] })
            // });

            // const result = await response.json();
            // console.log('xmlreq: ' + result);
        });

        uie.addReq(ibut2, 'click', '/weather/chat', { f: 'UserRegzd08hvlKhwfu', params: ['userLogin', 'password'] }, res => { console.log('xmlreq: ' + res); })

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
        const outMsg = outMsg1(7878, 'В первые годы после появления язык JavaScript чаще всего использовался для создания маленьких и простых сценариев, встроенных прямо в вебстраницы.');
        chatArea.addElm(outMsg);

        return cont;
    }

    function createRegForm () {
        const cont = new uie.UICont('contRegForm', ' tranOpac'); // posAbs
        cont.elm().style.visibility = 'visible'; // для функции скрытия

        const login = new uie.UITextEditValid('login', 'Логин', '3-5 символов русского, латинского алфавита, цифры');

        // uie.addReq(login.inp, 'click', '/weather/chat', { f: 'UserRegzd08hvlKhwfu', params: ['userLogin', 'password'] }, res => { login.inp.value = res; })

        const passw1 = new uie.UITextEditValid('passw1', 'Пароль', '3-5 символов латинского алфавита, цифры');

        const passw2 = new uie.UITextEditValid('passw2', 'Пароль ещё раз', '3-5 символов латинского алфавита, цифры');
        cont.addElm(login, passw1, passw2);

        return cont;
    }

    function createLoginForm () {
        // const cont = new uie.UICont('contLogForm', 'posAbs tranOpac');
        const cont = new uie.UIForm('logForm', 'posAbs tranOpac');
        cont.elm().style.visibility = 'visible'; // для функции скрытия

        const login = new uie.UITextEditValid('login', 'Логин', '3-5 символов русского, латинского алфавита, цифры');

        // uie.addReq(login.inp, 'click', '/weather/chat', { f: 'UserRegzd08hvlKhwfu', params: ['userLogin', 'password'] }, res => { login.inp.value = res; })

        const passw = new uie.UITextEditValid('passw', 'Пароль', '3-5 символов латинского алфавита, цифры');
        cont.addElm(login, passw);
        return cont;
    }

    function creaWaitForm (text) {
        // const img = new uie.UIImage('waitImg', 'posAbs tranOpac anim', '/weather/img/avat_01.png');
        // img.elm().style.visibility = 'hidden'; // для функции скрытия

        // const msg = uie.UICreateElement('span', '', text);
        // img.addElm(msg);
        const cont = new uie.UIWaitMsg('wait1', 'lgndImg16', text);

        return cont;
    }

    function createCaptionPan (caption) {
        const cont = new uie.UICont('contCapt', 'captPan');
        const ico = new uie.UILegendItem('ico', caption, 'lgndImg16', '16px');
        cont.addElm(ico);
        const rButt1 = new uie.UIImgButton('rButt1', 'btnInit', '-17px');
        const rButt2 = new uie.UIImgButton('rButt2', 'btnInit', '-17px');

        rButt2.elm().addEventListener('click', function () {
            remCtrl('logRegDlg');
        });

        cont.addElm(rButt1, rButt2);
        return cont;
    }

    function createDialog (params) {
        const cont = new uie.UICont('logRegDlg', 'popUpBgd flxCnt'); // фоновый контейнер
        const popUpCont = new uie.UICont('popUpCont', 'flxColCntH bkg'); // dlg
        cont.addElm(popUpCont);

        const capt = createCaptionPan('Hello! Caption!');

        // NOTE: тело диалога подстраивается под размер содержимого, но тк содержимое с
        // абсолютной позиц, то тело схлопываетя в 0. По этому делаем контейнер
        // (с самым большим содержимым) с обычныой позицией и скрываем его если надо,
        // остальные с абсолютной
        const dlgBodyCont = new uie.UICont('dlgBodyCont', 'flxCntGrw posRel');  // dlgBody
        const logForm = createLoginForm();
        const regForm = createRegForm();
        const waitImg = creaWaitForm('Waiting...');
        regForm.tglVis();
        // waitImg.tglVis();

        dlgBodyCont.addElm(logForm, regForm, waitImg);

        const buttPan = new uie.UICont('buttPan', 'flxCnt');

        const butOk = new uie.UITextButton('butOk', 'Ок', 'btnInit', '', '52px');
        const butCancel = new uie.UITextButton('butCancel', 'Отмена', 'btnInit', '', '52px');
        buttPan.addElm(butOk, butCancel);

        butOk.elm().addEventListener('click', function () {
            logForm.tglVis();
            // regForm.tglVis();
            waitImg.tglVis();
            waitImg.uiCont.img.toggleAnim('example');
        });

        butCancel.elm().addEventListener('click', function () {
            remCtrl('logRegDlg');
        });

        popUpCont.addElm(capt, dlgBodyCont, buttPan);
        return cont;
    }

    function ititUI () {
        const bodyElm = new uie.UICont('body', 'myChatComm flexCol', '100%');
        topParent.appendChild(bodyElm.elm());
        addCtrl(bodyElm);

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
