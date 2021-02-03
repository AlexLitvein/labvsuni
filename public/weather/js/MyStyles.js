function MyStyles () {
    const styles = {

        // setStyle: function (elm) {
        //         for (let y = 1; y < arguments.length; y++) {
        //             const arr = arguments[y];
        //             for (let i = 0; i < arr.length;) {
        //                 elm.style[arr[i]] = arr[++i];
        //             }
        //         }
        //     }

    };

    styles.empty = [];
    styles.brd1 = ['border', '1px solid FireBrick'];
    styles.flex = [
        ...styles.brd1,
        'display', 'flex'
    ];

    styles.flexGrow = [
        ...styles.flex,
        'flexGrow', '1'
    ];

    styles.itemCent = [
        ...styles.flex,
        // ...styles.contFlx,
        'justify-content', 'center', //, space-between/around(доб макс простр между)
        // 'flex-grow', '1'//,
        'align-items', 'center'//, // flex-end, stretch(no hight)
        // 'flex-wrap', 'wrap'
        // flex-basis минимальн размер
    ];

    styles.itemCentGrow = [
        ...styles.flexGrow,
        // ...styles.contFlx,
        'justify-content', 'center', //, space-between/around(доб макс простр между)
        // 'flex-grow', '1'//,
        'align-items', 'center'//, // flex-end, stretch(no hight)
        // 'flex-wrap', 'wrap'
        // flex-basis минимальн размер
    ];

    styles.flexGrowCol = [
        ...styles.flexGrow,
        // 'justify-content', 'center',
        'flex-direction', 'column'
    ];

    styles.flexCol = [
        ...styles.flex,
        // 'justify-content', 'center',
        'flex-direction', 'column'
    ];
    styles.imgSprite = [
        'background', 'url("nIcon-02.png")'
    ];

    styles.btnNorm = [
        'background-color', 'lightblue',
        'transform', 'translateY(0px)'
    ];
    // styles.btnUp = ['background-color', 'green'];
    styles.btnOver = ['background-color', 'green'];
    // styles.btnOut = ['background-color', 'green'];
    styles.btnDown = ['transform', 'translateY(1px)'];
    styles.btnUp = ['transform', 'translateY(0px)'];

    // styles.btnDwn = ['background-color', 'red'];
    styles.btnInit = [
        ...styles.itemCent,
        ...styles.btnNorm,
        'border-width', '2px',
        'border-radius', '5px',
        'border-style', 'solid',
        'border-color', '#C4B8FF',
        // 'padding', '20px',
        'margin', '1px',
        // 'transform', 'translateY(2px)',
        // 'overflow', 'hidden',
        // 'text-align', 'center',
        'user-select', 'none'//,
        // 'font-family', 'Segoe UI'
    ];

    // styles.contFlx = [
    //     // 'display', 'flex'
    // ];
    // styles.body = [
    //     ...styles.cont,
    //     // ...styles.contFlx,
    //     // 'flex-grow', '1'
    //     // 'height', '100%'//,
    //     // 'font-family', 'Segoe UI' // не наследуется
    // ];

    return styles;
}
