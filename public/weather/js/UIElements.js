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

    this.UICreateElement = function (tag, text = '', clsCss = '') {
        const elm = document.createElement(tag);
        if (text) elm.innerText = text;
        if (clsCss) elm.className = clsCss;
        return elm;
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

        setClass: function (classesNames) {
            if (classesNames) this.elm().className = classesNames;
        }
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
        this.setClass(clsName); // at the end
    }
    this.UICont.prototype = UIProto;

    this.UILegendItem = function (name, text, clsName, offsX = 0, offsY = 0) {
        const uiCont = new self.UICont(name, 'flxCentH');
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const legImg = document.createElement('image');
        legImg.className = clsName;
        legImg.style.backgroundPositionX = offsX;
        legImg.style.backgroundPositionY = offsY;
        uiCont.addElm(legImg);
        const txt = document.createElement('span');
        txt.innerText = text;
        uiCont.addElm(txt);
    }
    this.UILegendItem.prototype = UIProto;

    this.UIImage = function (name, clsName, url, h = '', w = '') {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const img = document.createElement('img');
        img.src = url;
        uiCont.addElm(img);
    }
    this.UIImage.prototype = UIProto;

    this.UITextButton = function (name, text, clsName, h = '', w = '') {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        // this.doClick = function () { console.log('doClick'); }
        // this.elm().addEventListener('click', this.doClick);
        // this.elm().addEventListener('mouseenter', (evt) => this.setClass('btnOver'));
        // this.elm().addEventListener('mouseleave', (evt) => this.setClass('btnNorm'));
        // this.elm().addEventListener('mousedown', (evt) => this.setClass('btnDown'));
        // this.elm().addEventListener('click', (evt) => this.setClass('btnUp'));

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
        img.className = 'buttImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        uiCont.addElm(img);
    }
    this.UIImgButton.prototype = UIProto;

    this.UITextEditValid = function (name, label, title, offsX = 0, offsY = 0) {
        const uiCont = new self.UICont(name, 'flxCentH jstfItEnd');
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const lab = self.UICreateElement('span', label);
        const inp = document.createElement('input');
        inp.className = 'myInput';
        inp.setAttribute('type', 'text');

        const img = document.createElement('image');
        img.className = 'buttImg16';
        img.style.backgroundPositionX = offsX;
        img.style.backgroundPositionY = offsY;
        if (title) img.title = title;

        uiCont.addElm(lab, inp, img);
    }
    this.UITextEditValid.prototype = UIProto;
}
