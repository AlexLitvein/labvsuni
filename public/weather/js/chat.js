(function  (idParent) {
    loadFile('/weather/css/chat.css', 'css');
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
        prmLegnd.push(['lg1', '8888', 'flxItCntGrw', '16px', '0px', '0px']);
        prmLegnd.push(['lg2', '9999', 'flxItCntGrw', '16px', '16px', '0px']);
        prmLegnd.push(['lg3', '9999', 'flxItCntGrw', '16px', '32px', '0px']);
        // prmLegnd.push(['lg4', '9999', 'flxItCntGrw', '16px', '48px', '0px']);
        const lgnds = uie.UICreateMany(prmLegnd, uie.UILegendItem);
        rPanBot.addElm(...lgnds);

        cont.addElm(lPan, rPan);
        return cont;
    }

    function createMenu (name) {
        const cont = new uie.UICont(name, 'flxGrw', '32px');

        const ibut1 = new uie.UITextButton('ibut1', 'New', 'btnInit', '', '52px');
        const ibut2 = new uie.UITextButton('ibut2', 'New', 'btnInit', '', '52px');
        cont.addElm(ibut1, ibut2);

        ibut1.elm().addEventListener('click', function () {
            const body = 'func=' + 'AddMsgz08Kw4fu' + '&params=' + encodeURIComponent('New message');
            // 'startData=' + encodeURIComponent('New message') + '&range=' + encodeURIComponent(range);
            const xhr = new XMLHttpRequest();
            xhr.timeout = 3000; // (в миллисекундах)
            xhr.open('POST', '/weather/chat', true); // true – асинхронно
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (data.length !== 0) {
                        console.log('onreadystatechange: ' + data);
                    }
                }
            }
        });

        return cont;
    }

    function outMsg1 (uid, msg) {
        const cont = new uie.UICont('outMsg', '');
        const sender = new uie.UICont('sender', 'flx'); //, '16px'
        cont.addElm(sender);

        const pSender = document.createElement('p');
        pSender.className = 'chatText';
        pSender.innerText = 'Sender: ' + uid;
        sender.elm().appendChild(pSender);

        const p = document.createElement('p');
        p.className = 'chatText';
        p.innerText = msg;
        cont.elm().appendChild(p);

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
        inputMsg.elm().appendChild(textBox);
        const inputButt = new uie.UITextButton('inputButt', 'OK', 'btnInit', h, h);
        inputMsg.addElm(inputButt);
        cont.addElm(inputMsg);

        // temp
        const outMsg  = outMsg1(7878, 'В первые годы после появления язык JavaScript чаще всего использовался для создания маленьких и простых сценариев, встроенных прямо в вебстраницы.');
        chatArea.addElm(outMsg);

        return cont;
    }

    function createDialog (params) {
        const popUpCont = new uie.UICont('popUpCont', 'flxItCnt popUpDialog');

        const rows = uie.UICreateRows('flxCentH', '10px', '100px', '10px', '100px', '10px', '100px');
        popUpCont.addElm(...rows);
        return popUpCont;
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

        const dia = createDialog();
        bodyElm.addElm(dia);

        // console.log(rPan);
        // const ibut1 = new uie.UIImgButton('ibut1', myStyles.brd1, 'url("avat_03.png")', '32px', '32px', '0px', '0px');
        // rPan.addElm(ibut1);
    }
})();
