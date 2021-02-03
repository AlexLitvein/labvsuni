function UIElms (oStyles) {
    const self = this;
    const styles = oStyles;

    this.UICreateMany = function (arrPrms, constr) {
        const arrOut = [];
        for (let y = 0; y < arrPrms.length; y++) {
            const prms = arrPrms[y];
            arrOut.push(new constr(...prms));
        }
        return arrOut;
    }

    this.UICreateRows = function (clsCss) {
        const arrOut = [];
        for (let y = 1; y < arguments.length; y += 2) {
            // const h = arguments[y];
            const mdiv = new this.UICont('row-' + y, clsCss, arguments[y], arguments[y + 1]);
            arrOut.push(mdiv);
        }
        return arrOut;
    }

    const UIProto = {
        addElm: function () {
            for (let y = 0; y < arguments.length; y++) {
                const elm = arguments[y];
                this[elm.name()] = elm;
                this.elm().appendChild(elm.elm());
            }
        },
        // setStyle: function () {
        //     for (let y = 0; y < arguments.length; y++) {
        //         const arr = arguments[y];
        //         for (let i = 0; i < arr.length;) {
        //             this.elm().style[arr[i]] = arr[++i];
        //         }
        //     }
        // }
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

    this.UILegendItem = function (name, text, clsName, h, offsX, offsY) {
        const uiCont = new self.UICont(name, clsName);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const legImg = document.createElement('image');
        legImg.className = 'lgndImg16';
        // this.setClass('lgndImg16');
        // legImg.src = '/weather/img/1x1.png';
        // legImg.style.height = legImg.style.width = h;
        // legImg.style.background = 'url("/weather/img/nIcon-02.png")';
        legImg.style.backgroundPositionX = offsX;
        legImg.style.backgroundPositionY = offsY;
        this.elm().appendChild(legImg);
        // helm.appendChild(this.legImg);
        // helm.insertBefore(this.legImg, helm.firstChild);
        const txt = document.createElement('span');
        txt.innerText = text;
        this.elm().appendChild(txt);
    }
    this.UILegendItem.prototype = UIProto;

    this.UIImage = function (name, clsName, url, h = '', w = '') {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        const img = document.createElement('img');
        img.src = url;
        uiCont.elm().appendChild(img);
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
        uiCont.elm().appendChild(txt);
    }
    this.UITextButton.prototype = UIProto;

    this.UIImgButton = function (name, clsName, url, h, w, offsX, offsY) {
        const uiCont = new self.UICont(name, clsName, h, w);
        this.name = () => uiCont.name();
        this.elm = () => uiCont.elm();

        // this.elm().style.background = url;
        this.elm().style.backgroundPositionX = offsX;
        this.elm().style.backgroundPositionY = offsY;
        // cont.elm().appendChild(legImg);

        // const txt = document.createElement('span');
        // txt.innerText = '9999';
        // cont.elm().appendChild(txt);
    }
    this.UIImgButton.prototype = UIProto;
}
