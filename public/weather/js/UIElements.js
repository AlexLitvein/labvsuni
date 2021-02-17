function UIElms (oStyles) {
    const self = this;
    // const styles = oStyles;
    // this.delay = async function (ms) {
    //     const start = Date.now();
    //     let now = start;
    //     while (now - start < ms) {
    //         now = Date.now();
    //     }
    // };

    this.delay = function (ms) { // use - await delay(xxx)
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    this.UICreateMany = function (arrPrms, constr) {
        const arrOut = [];
        for (let y = 0; y < arrPrms.length; y++) {
            const prms = arrPrms[y];
            arrOut.push(new constr(...prms));
        }
        return arrOut;
    }

    this.UICreateHtmlElm = function (tag, clsCss = '', text = '') {
        const elm = document.createElement(tag);
        if (text) elm.innerText = text;
        if (clsCss) elm.className = clsCss;
        return elm;
    }

    this.createReq = function (elm, eAct, sUrl, oParams, cbFunc) {
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

    this.createFakeReq = function (elm, eAct, sUrl, oParams, cbBefore, cbAfter) {
        let outElm = elm;
        if (elm.name) {
            outElm = elm.elm();
        }

        outElm.addEventListener(eAct, async function () {
            cbBefore();
            await self.delay(2000);
            cbAfter(oParams);
        });
    }

    const UIProto = {
        name: function () { return this.uiCont.nm; }, // стрелочные не канают
        elm: function () { return this.uiCont.helm; },

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
            this.elm().style.animationName = this.elm().style.animationName === '' ? kfName : '';
        },
        tglVis: function (ms) {
            const vis = this.elm().style.visibility;
            if (vis === 'visible') {
                this.elm().style.opacity = 0;
                // transition: opacity 0.4s ease-out 0.2s; 0.4+0.2=0.6(600)
                setTimeout(() => { this.elm().style.visibility = 'hidden'; }, ms);
            } else {
                this.elm().style.opacity = 1;
                // setTimeout(() => { this.elm().style.visibility = 'visible'; }, ms);
                this.elm().style.visibility = 'visible';
            }
        },
        hide: function (ms, f) {
            setTimeout(() => {
                this.elm().style.visibility = 'hidden';
                this.elm().style.opacity = 0;
                if (f) f();
            }, ms);
        }//,
    }

    this.UICont = function (name, clsName, h = '', w = '') {
        this.nm = name;
        this.helm = document.createElement('div');
        this.name = function () { return this.nm; }
        this.elm = function () { return this.helm; }
        if (h) {
            this.helm.style.height = h;
            // htmlelm.style.minHeight = h;
        }
        if (w) {
            // htmlelm.style.width = w;
            this.helm.style.minWidth = w;
        }
        this.addClass(clsName); // at the end
    }
    this.UICont.prototype = UIProto;

    this.UIForm = function (name, clsName, h = '', w = '') {
        this.nm = name;
        this.helm = document.createElement('form');
        this.name = function () { return this.nm; }
        this.elm = function () { return this.helm; }
        if (h) {
            this.helm.style.height = h;
            // htmlelm.style.minHeight = h;
        }
        if (w) {
            // htmlelm.style.width = w;
            this.helm.style.minWidth = w;
        }
        this.addClass(clsName); // at the end
    }
    this.UIForm.prototype = UIProto;

    this.UILegendItem = function (name, text, imgClsName, dir = 'right', offsX = 0, offsY = 0) {
        this.uiCont = new self.UICont(name, 'flxCnt');
        this.setImgClass = (clsName) => { this.img.className = clsName; };
        this.setTxtClass = (clsName) => { this.txt.className = clsName; };

        if (dir === 'left') this.uiCont.elm().style.flexDirection = 'row-reverse';
        if (dir === 'top') this.uiCont.elm().style.flexDirection = 'column-reverse';
        if (dir === 'bottom') this.uiCont.elm().style.flexDirection = 'column';

        this.txt = document.createElement('span');
        this.txt.innerText = text;
        this.img = document.createElement('image');
        // this.img.className = imgClsName;
        this.setImgClass(imgClsName);
        this.img.style.backgroundPositionX = offsX;
        this.img.style.backgroundPositionY = offsY;
        this.uiCont.addElm(this.img, this.txt);
    }
    this.UILegendItem.prototype = UIProto;

    this.UIImage = function (name, clsName, url, h = '', w = '') {
        this.uiCont = new self.UICont(name, clsName, h, w);
        // if (url) {
        const img = document.createElement('img');
        img.src = url;
        this.uiCont.addElm(img);
        // }
    }
    this.UIImage.prototype = UIProto;

    this.UITextButton = function (name, text, clsName, h = '', w = '') {
        this.uiCont = new self.UICont(name, clsName, h, w);
        const txt = document.createElement('span');
        txt.innerText = text;
        this.uiCont.addElm(txt);
    }
    this.UITextButton.prototype = UIProto;

    this.UIImgButton = function (name, clsName, offsX = 0, offsY = 0) {
        this.uiCont = new self.UICont(name, clsName);
        // this.name = () => uiCont.name();
        // this.elm = () => uiCont.elm();

        const img = document.createElement('image');
        img.className = 'sysImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        this.uiCont.addElm(img);
    }
    this.UIImgButton.prototype = UIProto;

    this.UITextEditValid = function (name, label, title, offsX = 0, offsY = 0) {
        this.uiCont = new self.UICont(name, 'flxCentH cntEnd');
        const lab = self.UICreateHtmlElm('span', '', label);
        const inp = document.createElement('input');
        inp.className = 'myInput';
        inp.setAttribute('type', 'text');
        inp.pattern = '^[а-яА-Яa-zA-Z0-9]{3,10}$';

        const img = document.createElement('image');
        img.className = 'sysImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        if (title) img.title = title;

        this.uiCont.addElm(lab, inp, img);
    }
    this.UITextEditValid.prototype = UIProto;

    this.UIMsgBox = function (name, text, url = '', txtButt = '', cb) {
        this.uiCont = new self.UICont(name, 'flxColCnt posAbs tranOpac');
        this.hide(0);
        this.txt = this.img = this.mButt = null;
        const szImg = '32px';
        if (url) {
            this.img = new self.UIImage('img1', 'msgBoxImg anim', url, szImg, szImg);
            this.uiCont.addElm(this.img);
        }
        if (text) {
            this.txt = new self.UICreateUIElm('text', 'p', text, 'msgBoxHeader');
            this.uiCont.addElm(this.txt);
        }
        if (txtButt) {
            this.mButt = new self.UITextButton('buttOk', 'Ok', 'btnInit', '10px', '52px');
            this.uiCont.addElm(this.mButt);
            if (cb) { this.mButt.elm().addEventListener('click', cb); }
        }
        this.toggleAnim = function (kfName) {
            if (this.img) this.img.toggleAnim(kfName);
        }
    }
    this.UIMsgBox.prototype = UIProto;

    this.UIPopupWnd = function (name) {
        this.uiCont = new self.UICont(name, 'popUpBgd flxCnt'); // фоновый контейнер
        this.uiCont.elm().style.visibility = 'hidden'; // для функции скрытия
        // this.uiCont.hide(0);
        let dlgCont = new self.UICont('dlgCont', 'dlgCont bkg');
        this.uiCont.addElm(dlgCont);
        let currShow = null;

        this.close = function () {
            currShow = null;
            this.uiCont.elm().style.visibility = 'hidden';
            this.uiCont.elm().removeChild(dlgCont.elm());
            delete this.dlgCont;

            dlgCont = new self.UICont('dlgCont', 'dlgCont bkg');
            this.uiCont.addElm(dlgCont);
        }
        // this.show = function (uielm, ms) {
        //     this.uiCont.elm().style.visibility = 'visible';
        //     if (currShow !== null) currShow.tglVis(ms);
        //     uielm.tglVis(ms);
        //     currShow = uielm;
        // }
        this.show = function (elmName, ms) {
            this.uiCont.elm().style.visibility = 'visible';
            if (currShow !== null) currShow.tglVis(ms);
            const e1 = dlgCont[elmName];
            if (e1) {
                e1.tglVis(ms);
                currShow = e1;
            }
            return e1;
        }
        this.getItem = function (itemName) {
            return dlgCont[itemName];
        }
        this.addElm = function () {
            dlgCont.addElm(...arguments);
        }
    }
    this.UIPopupWnd.prototype = UIProto;

    this.UICreateUIElm = function (name, tag, text = '', clsCss = '') {
        this.uiCont = new self.UICont(name, 'flxCnt');
        this.item = self.UICreateHtmlElm(tag, clsCss, text);
        this.uiCont.addElm(this.item);
    }
    this.UICreateUIElm.prototype = UIProto;
}
