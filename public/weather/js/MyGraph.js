function MyGraph (context, x, y, width, height) {
    const mCtx = context;
    const mName = 'MyGraph';
    const mhFont = 10;
    const labelOffs = 2;
    mCtx.font = mhFont + 'px Arial, Helvetica, sans-serif';
    const dataLabelLen = mCtx.measureText('12/12/20').width;
    const mX = x;
    const mY = mCtx.canvas.height - dataLabelLen - labelOffs;
    const mW = height - x - x;
    const mH = width - y - y;

    // let m_nMainVLine = 0;
    // let m_nMinVLine = 0;
    // const vMainLineStep = 24;
    const nMainHLine = 10;
    const nMinHLine = 10;
    // const wLine = 1.0;
    const wGraphLine = 2.0;
    let incDBDataIdx = 1;
    // const totVLine = 0;
    const totHLine = nMainHLine * nMinHLine;
    let dxVLine = 0; // m_w / m_totVLine;
    const dyHLine = mH / totHLine;
    const iDMainL = [3, 8]; // index Data for Main Line [x-idxStart, x-len]
    const iDMinL = [0, 2]; // index Data for Main Line [x-idxStart, x-len]

    const clrBckGnd = '#072A60';
    const clrMainLine = '#C4B8FF';
    const clrMinLine = '#C4B8FF';
    const clrTxt = '#C4B8FF';
    // const clrP = '#00ff35';
    // const clrTemp = '#C86F32';
    // const clrHg = '#00FFFF';
    const dashLine = [1, 1];
    // let m_data = new Date();
    let arrData = null;

    // const options =
    // {
    //     clrP: '#00ff35',
    //     clrTemp: '#C86F32',
    //     clrHg: '#00FFFF'
    // };

    let options =
    {
        p: { clr: '#00ff35', bDraw: true },
        t: { clr: '#C86F32', bDraw: true },
        h: { clr: '#00FFFF', bDraw: true }
    };

    // mCtx.lineWidth = wLine;
    mCtx.fillStyle = clrBckGnd;
    mCtx.fillRect(0, 0, mCtx.canvas.width, mCtx.canvas.height);
    mCtx.fillStyle = clrTxt;
    mCtx.textAlign = 'center';
    // mCtx.fillText('Нет данных для вывода(', mW / 2, mH / 2);

    const obj = {
        sayName () {
            console.log('Hi, I am a ', mName + '.');
        },

        GetOrigin () {
            return { orgX: mX, origY: dataLabelLen + labelOffs };
        },

        GetGraphSize () {
            return { w: mW, h: mH };
        },

        setDrawOpt (opt) {
            // $.each(jqArr, function (index, value) {
            //     //console.log($(value).val());
            //   });
            options = opt;
            // options.p.clr = arrItems[0].value;
            // options.t.clr = arrItems[1].value;
            // options.h.clr = arrItems[2].value;
        },

        drawGraph (inArrData, nRange) {
            arrData = inArrData;
            mCtx.fillStyle = clrBckGnd;
            mCtx.fillRect(0, 0, mCtx.canvas.width, mCtx.canvas.height);
            if (arrData.length === 0) {
                mCtx.fillStyle = clrTxt;
                mCtx.fillText('Нет данных в базе(', mW / 2, mH / 2);
                return;
            }

            let i = 24;
            for (; i > 0; i--) {
                if (24 % i === 0) {
                    dxVLine = mW / (i * nRange);
                    if (dxVLine > mhFont) {
                        incDBDataIdx = 24 / i;
                        break;
                    }
                }
            }

            this.drawHLine();
            this.drawVLine();
            this.drawData();
        },

        drawHLine () {
            const pathMainLine = new Path2D();
            const pathMinLine = new Path2D();
            let startP = 700;
            mCtx.textAlign = 'right';
            for (let i = 0; i <= totHLine; i++) {
                if (i % nMinHLine !== 0) {
                    pathMinLine.moveTo(mX, mY - (dyHLine * i));
                    pathMinLine.lineTo(mX + mW, mY - (dyHLine * i));
                } else {
                    if (options.p.bDraw === true) {
                        mCtx.fillStyle = options.p.clr;
                        mCtx.fillText(startP.toString(), mX - 3, mY - (dyHLine * i) - (mhFont / 2));
                    }
                    startP += 10;

                    if (options.h.bDraw === true) {
                        mCtx.fillStyle = options.h.clr;
                        mCtx.fillText(i + '%', mX - 3, mY - (dyHLine * i) + (mhFont / 2));
                    }

                    if (options.t.bDraw === true) {
                        mCtx.fillStyle = options.t.clr;
                        mCtx.fillText((-50 + (1 * i)) + '\u00b0', mX - 3, mY - (dyHLine * i) + mhFont + (mhFont / 2));
                    }
                    pathMainLine.moveTo(mX, mY - (dyHLine * i));
                    pathMainLine.lineTo(mX + mW, mY - (dyHLine * i));
                }
            }
            mCtx.strokeStyle = clrMinLine;
            mCtx.setLineDash(dashLine);
            mCtx.stroke(pathMinLine);

            mCtx.strokeStyle = clrMainLine;
            mCtx.setLineDash([]);
            mCtx.stroke(pathMainLine);
            mCtx.textAlign = 'left';
        },

        drawVLine () {
            const pathMainLine = new Path2D();
            const pathMinLine = new Path2D();
            let nxtX = 0;

            mCtx.save();
            mCtx.textAlign = 'right';
            mCtx.fillStyle = clrTxt;
            mCtx.translate(0, mCtx.canvas.height);
            // const tmpY = mX;
            mCtx.rotate(-Math.PI / 2);

            let k = 0;
            let prevDay = 0;
            let currDay = 0;
            // for (let i = 0; i < arrData.length; i++) {
                for (let i = 0; i < arrData.length; i += incDBDataIdx) {
                const data = new Date(arrData[i]._id);
                const toffs = data.getTimezoneOffset();
                data.setHours(data.getHours() + toffs / 60);
                const dataStr = ('0' + data.getHours()).slice(-2) + '/' + ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() % 100;

                currDay = data.getDate();
                // x = mX + (dxVLine * i);
                // x = mX + (dxVLine * (i / incDBDataIdx));
                nxtX = mX + (dxVLine * k);
                if (currDay !== prevDay) {
                // if (vLineStep % data.getDate() === 0)
                // if (data.getHours() % vMainLineStep === 0) {
                    const str2 = dataStr.substr(iDMainL[0], iDMainL[1]);
                    // mCtx.fillText(str2, mX - 3, tmpY + (dxVLine * i) + (mhFont / 2)); // x - +vert, y - +horz
                    mCtx.fillText(str2, dataLabelLen, nxtX + (mhFont / 2)); // x - +vert, y - +horz
                    // mCtx.fillText(dataStr, mX + 27, x + (mhFont / 2)); // x - +vert, y - +horz
                    pathMainLine.moveTo(nxtX, mY);
                    pathMainLine.lineTo(nxtX, mY - mH);
                } else {
                    const str1 = dataStr.substr(iDMinL[0], iDMinL[1]);
                    // mCtx.fillText(str1, mX - 2, x + (mhFont / 2)); // x - +vert, y - +horz
                    mCtx.fillText(str1, dataLabelLen, nxtX + (mhFont / 2)); // x - +vert, y - +horz
                    pathMinLine.moveTo(nxtX, mY);
                    pathMinLine.lineTo(nxtX, mY - mH);
                }
                prevDay = currDay;
                k++;
            }

            mCtx.restore();
            mCtx.strokeStyle = clrMinLine;
            mCtx.setLineDash(dashLine);
            mCtx.stroke(pathMinLine);

            mCtx.strokeStyle = clrMainLine;
            mCtx.setLineDash([]);
            mCtx.stroke(pathMainLine);
        },

        drawData () {
            const pathTemp = new Path2D();
            const pathP = new Path2D();
            const pathHg = new Path2D();

            pathTemp.moveTo(mX, mY - ((arrData[0].temp + 50) / 100) * mH);
            mCtx.save();
            mCtx.lineWidth = wGraphLine;

            let inc = 0;
            for (let i = 0; i < arrData.length; i += incDBDataIdx) {
                // pathTemp.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].temp + 50) / 100) * m_h);
                // pathP.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].p) / 1000) * m_h);
                // pathHg.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].hg) / 100) * m_h);
                pathTemp.lineTo(mX + dxVLine * inc, mY - ((arrData[i].temp + 50) / 100) * mH);
                pathP.lineTo(mX + dxVLine * inc, mY - ((arrData[i].p - 700) / 100) * mH);
                pathHg.lineTo(mX + dxVLine * inc, mY - ((arrData[i].hg) / 100) * mH);
                inc++;
                // console.log(i);
            }

            if (options.t.bDraw === true) {
                mCtx.strokeStyle = options.t.clr;
                mCtx.stroke(pathTemp);
            }

            if (options.p.bDraw === true) {
                mCtx.strokeStyle = options.p.clr;
                mCtx.stroke(pathP);
            }
            if (options.h.bDraw === true) {
                mCtx.strokeStyle = options.h.clr;
                mCtx.stroke(pathHg);
            }
            mCtx.restore();
        }
    }
    return obj;
}
