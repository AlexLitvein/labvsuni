function UIElms (oStyles) {
    const self = this;
    // const styles = oStyles;

    this.UICreateMany = function (arrPrms, constr) {
        const arrOut = [];
        for (let y = 0; y < arrPrms.length; y++) {
            const prms = arrPrms[y];
            arrOut.push(new constr(...prms));
        }
        return arrOut;
    }

    // this.UICreateContainers = function (name, clsCss) {
    //     const arrOut = [];
    //     for (let y = 2; y < arguments.length; y += 2) {
    //         // const h = arguments[y];
    //         const mdiv = new this.UICont(name + y, clsCss, arguments[y], arguments[y + 1]);
    //         arrOut.push(mdiv);
    //     }
    //     return arrOut;
    // }

    this.UICreateElement = function (tag, clsCss = '', text = '') {
        const elm = document.createElement(tag);
        if (text) elm.innerText = text;
        if (clsCss) elm.className = clsCss;
        return elm;
    }

    this.addReq = function (elm, eAct, sUrl, oParams, cbFunc) {
        let outElm = elm;
        if (elm.name) {
            outElm = elm.elm();
        }

        outElm.addEventListener(eAct, async function () {
            const response = await fetch(sUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(oParams)
            });

            const result = await response.json();
            cbFunc(result);
        });
    }

    const UIProto = {
        addElm: function () {
            for (let y = 0; y < arguments.length; y++) {
                const elm = arguments[y];
                if (elm.name) {
                    this[elm.name()] = elm;
                    this.elm().appendChild(elm.elm());
                } else { this.elm().appendChild(elm); }
            }
        },
        setClass: function (clsNames) {
            this.elm().className = clsNames;
        },
        addClass: function (clsNames) {
            this.elm().className = clsNames + ' ' + this.elm().className;
        },
        toggleAnim: function (kfName) {
            // this.elm().className = this.elm().className + ' ' + clsName;
            let an = this.elm().style.animationName;
            if (an === '') an = kfName;
            else an = '';
            this.elm().style.animationName = an;
        },
        tglVis: function () {
            const vis = this.elm().style.visibility;
            if (vis === 'visible') {
                this.elm().style.opacity = 0;
                // transition: opacity 0.4s ease-out 0.2s; 0.4+0.2=0.6(600)
                setTimeout(() => { this.elm().style.visibility = 'hidden'; }, 600);
            } else {
                this.elm().style.opacity = 1;
                setTimeout(() => { this.elm().style.visibility = 'visible'; }, 600);
            }
        },
        hide: function (ms, f) {
            setTimeout(() => {
                this.elm().style.visibility = 'hidden';
                if (f) f();
            }, ms);
        }//,

        // addAct: function (eAct, sUrl, oParams, cbFunc) {
        //     this.elm().addEventListener(eAct, async function () {
        //         const response = await fetch(sUrl, {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json;charset=utf-8' },
        //             body: JSON.stringify(oParams)
        //         });

        //         const result = await response.json();
        //         cbFunc(result);
        //         // console.log('xmlreq: ' + result);
        //     });
        // }
    }

    this.UICont = function (name, clsName, h = '', w = '') {
        const nm = name;
        const htmlelm = document.createElement('div');
        this.name = () => nm;
        this.elm = () => htmlelm;
        if (h) {
            htmlelm.style.height = h;
            // htmlelm.style.minHeight = h;
        }
        if (w) {
            // htmlelm.style.width = w;
            htmlelm.style.minWidth = w;
        }
        this.addClass(clsName); // at the end
    }
    this.UICont.prototype = UIProto;

    this.UIForm = function (name, clsName, h = '', w = '') {
        const nm = name;
        const htmlelm = document.createElement('form');
        this.name = () => nm;
        this.elm = () => htmlelm;
        if (h) {
            htmlelm.style.height = h;
            // htmlelm.style.minHeight = h;
        }
        if (w) {
            // htmlelm.style.width = w;
            htmlelm.style.minWidth = w;
        }
        this.addClass(clsName); // at the end
    }
    this.UIForm.prototype = UIProto;

    this.UILegendItem = function (name, text, clsName, offsX = 0, offsY = 0) {
        const uiCont = new self.UICont(name, 'flxCentH');
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();
        this.text = document.createElement('span');

        this.img = document.createElement('image');
        this.img.className = clsName;
        this.img.style.backgroundPositionX = offsX;
        this.img.style.backgroundPositionY = offsY;
        uiCont.addElm(this.img);

        this.text.innerText = text;
        uiCont.addElm(this.text);
    }
    this.UILegendItem.prototype = UIProto;

    this.UIImage = function (name, clsName, url, h = '', w = '') {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        if (url) {
            const img = document.createElement('img');
            img.src = url;
            uiCont.addElm(img);
        }
    }
    this.UIImage.prototype = UIProto;

    this.UITextButton = function (name, text, clsName, h = '', w = '') {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        // this.doClick = function () { console.log('doClick'); }
        // this.elm().addEventListener('click', this.doClick);
        // this.elm().addEventListener('mouseenter', (evt) => this.addClass('btnOver'));
        // this.elm().addEventListener('mouseleave', (evt) => this.addClass('btnNorm'));
        // this.elm().addEventListener('mousedown', (evt) => this.addClass('btnDown'));
        // this.elm().addEventListener('click', (evt) => this.addClass('btnUp'));

        const txt = document.createElement('span');
        txt.innerText = text;
        uiCont.addElm(txt);
    }
    this.UITextButton.prototype = UIProto;

    this.UIImgButton = function (name, clsName, offsX = 0, offsY = 0) {
        const uiCont = new self.UICont(name, clsName);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const img = document.createElement('image');
        img.className = 'sysImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        uiCont.addElm(img);
    }
    this.UIImgButton.prototype = UIProto;

    // setAttribute('type', 'text') password text email / pattern
    // function (name, type, pattern, label, title, offsX = 0, offsY = 0)
    this.UITextEditValid = function (name, label, title, offsX = 0, offsY = 0) {
        const uiCont = new self.UICont(name, 'flxCentH cntEnd');
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const lab = self.UICreateElement('span', '', label);
        this.inp = document.createElement('input');
        this.inp.className = 'myInput';
        this.inp.setAttribute('type', 'text');
        this.inp.pattern = '^[а-яА-Яa-zA-Z0-9]{3,10}$';

        const img = document.createElement('image');
        img.className = 'sysImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        if (title) img.title = title;

        uiCont.addElm(lab, this.inp, img);
    }
    this.UITextEditValid.prototype = UIProto;

    this.UIWaitMsg = function (name, clsName, text, offsX = 0, offsY = 0) {
        const uiCont = new self.UILegendItem(name, text, clsName + ' ' + 'anim', offsX, offsY);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        uiCont.setClass('flxCnt posAbs tranOpac');
        uiCont.elm().style.visibility = 'hidden'; // для функции скрытия
    }
    this.UIWaitMsg.prototype = UIProto;
}
