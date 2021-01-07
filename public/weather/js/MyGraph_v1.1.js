<<<<<<< HEAD
function MyGraph (context, x, y, width, height) {
    const m_ctx = context;
    let m_name = 'MyGraph';
    let m_hFont = 10;
    let m_x = x;
    let m_y = m_ctx.canvas.height - y;
    let m_w = height;
    let m_h = width;
    let m_nMainVLine = 0;
    //let m_nMinVLine = 0;
    let m_nMainHLine = 10;
    let m_nMinHLine = 10;
    let m_wLine = 1;
    let m_incDBDataIdx = 1;
    let m_totVLine = 0;
    let m_totHLine = m_nMainHLine * m_nMinHLine;
    let m_dxVLine = 0; //m_w / m_totVLine;
    let m_dyHLine = m_h / m_totHLine;
    let m_iDMainL = [3, 5]; // index Data for Main Line [x-idxStart, x-len]
    let m_iDMinL = [0, 2]; // index Data for Main Line [x-idxStart, x-len]
    m_ctx.font = m_hFont + 'px Arial, Helvetica, sans-serif';
    let m_clrBckGnd = "#FFF9DB";
    let m_clrMainLine = '#AF9F52';
    let m_clrMinLine = "#C6C2B0";
    let m_clrTxt = '#000000';
    let m_clrTemp = '#fa0202';
    let m_clrP = '#00ff35';
    let m_clrHg = '#0255fa';
    let m_dashLine = [5, 2];
    //let m_data = new Date();
    let m_arrData = null;

    m_ctx.lineWidth = m_wLine;
    m_ctx.fillStyle = m_clrBckGnd;
    m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);
    m_ctx.fillStyle = m_clrTxt;
    m_ctx.textAlign = 'center';
    m_ctx.fillText("Нет данных для вывода(", m_w/2, m_h/2);

    const obj = {
        sayName() {
            console.log('Hi, I am a ', m_name + '.');
        },

        drawGraph(arrData, nRange)
        {
            m_ctx.fillStyle = m_clrBckGnd;
            m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);
            if(arrData.length === 0)
            {
                m_ctx.fillStyle = m_clrTxt;
                m_ctx.fillText("Нет данных в базе(", m_w/2, m_h/2);
                return;
            }

            m_arrData = arrData;
            m_nMainVLine = nRange;
            let i = 24;
            for ( ; i > 0; i--) {
                if(24 % i === 0)
                {
                    m_dxVLine = m_w / (i * m_nMainVLine);
                    if(m_dxVLine > m_hFont) {
                        m_incDBDataIdx = 24 / i;
                        break;
                    }
                }
            }
            m_totVLine = (m_nMainVLine) * i;


            this.drawHLine();
            this.drawVLine();
            //this.drawData();
        },

        drawHLine() {
            let pathMainLine = new Path2D();
            let pathMinLine = new Path2D();
            m_ctx.textAlign = 'right';
            for (let i = 0; i <= m_totHLine; i++) {
                if (i % m_nMinHLine !== 0)
                {
                    pathMinLine.moveTo(m_x, m_y - (m_dyHLine * i));
                    pathMinLine.lineTo(m_x + m_w, m_y - (m_dyHLine * i));
                }
                else
                {
                    m_ctx.fillStyle = m_clrP;
                    m_ctx.fillText((i * 10).toString(), m_x - 3,  m_y - (m_dyHLine * i) - m_hFont);
                    m_ctx.fillStyle = m_clrHg;
                    m_ctx.fillText(i + "%", m_x - 3,  m_y - (m_dyHLine * i));
                    m_ctx.fillStyle = m_clrTemp;
                    m_ctx.fillText((-50 + (1 * i)) + "\u00b0" , m_x - 3,  m_y - (m_dyHLine * i) + m_hFont);

                    pathMainLine.moveTo(m_x, m_y - (m_dyHLine * i));
                    pathMainLine.lineTo(m_x + m_w, m_y - (m_dyHLine * i));
                }
            }
            m_ctx.strokeStyle = m_clrMinLine;
            m_ctx.setLineDash(m_dashLine);
            m_ctx.stroke(pathMinLine);

            m_ctx.strokeStyle = m_clrMainLine;
            m_ctx.setLineDash([]);
            m_ctx.stroke(pathMainLine);
            m_ctx.textAlign = 'left';
        },

        drawVLine() {
            let pathMainLine = new Path2D();
            let pathMinLine = new Path2D();
            let x = 0;
            let vLineStep = 24;

            m_ctx.save();
            m_ctx.textAlign = 'right';
            m_ctx.fillStyle = m_clrTxt;
            m_ctx.translate(0, m_ctx.canvas.height);
            let tmpY = m_x;
            m_ctx.rotate(-Math.PI / 2);

            for (let i = 0; i < m_arrData.length; i++) {
                let data = new Date(m_arrData[i]._id);
                let toffs =  data.getTimezoneOffset();
                data.setHours(data.getHours()+toffs/60);
                let dataStr =  ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;

                x = m_x + (m_dxVLine * i);
                //if (vLineStep % data.getDate() === 0)
                if (data.getHours() % vLineStep  === 0)
                {
                    var str2 = dataStr.substr(m_iDMainL[0], m_iDMainL[1]);
                    m_ctx.fillText(str2, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
                    pathMainLine.moveTo(x, m_y);
                    pathMainLine.lineTo(x, m_y - m_h);
                }
                else
                {
                    var str1 = dataStr.substr(m_iDMinL[0], m_iDMinL[1]);
                    m_ctx.fillText(str1, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
                    pathMinLine.moveTo(x, m_y);
                    pathMinLine.lineTo(x, m_y - m_h);
                }
            }

            // for (let i = 0; i <= m_totVLine; i++) {
            //     //if(i * m_incDBDataIdx >= m_arrData.length) break;
            //     let data = new Date(m_arrData[i]._id);
            //     let toffs =  data.getTimezoneOffset();
            //     data.setHours(data.getHours()+toffs/60);
            //     let dataStr =  ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;

            //     x = m_x + (m_dxVLine * i);
            //     if (i % (m_totVLine / m_nMainVLine) === 0) //* m_totVLine)
            //     {
            //         //var str2 = m_arrData[i * m_incDBDataIdx].data.substr(m_iDMainL[0], m_iDMainL[1]);
            //         var str2 = dataStr.substr(m_iDMainL[0], m_iDMainL[1]);
            //         m_ctx.fillText(str2, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
            //         pathMainLine.moveTo(x, m_y);
            //         pathMainLine.lineTo(x, m_y - m_h);
            //     }
            //     else
            //     {
            //         //var str1 = m_arrData[i * m_incDBDataIdx].data.substr(m_iDMinL[0], m_iDMinL[1]);
            //         var str1 = dataStr.substr(m_iDMinL[0], m_iDMinL[1]);
            //         m_ctx.fillText(str1, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
            //         pathMinLine.moveTo(x, m_y);
            //         pathMinLine.lineTo(x, m_y - m_h);
            //         //console.log(i);
            //     }
            // }
            m_ctx.restore();
            m_ctx.strokeStyle = m_clrMinLine;
            m_ctx.setLineDash(m_dashLine);
            m_ctx.stroke(pathMinLine);

            m_ctx.strokeStyle = m_clrMainLine;
            m_ctx.setLineDash([]);
            m_ctx.stroke(pathMainLine);
        },

        drawData()
        {
            let pathTemp = new Path2D();
            let pathP = new Path2D();
            let pathHg = new Path2D();
            pathTemp.moveTo(m_x,m_y -  ((m_arrData[0].temp + 50) / 100) * m_h);

            let inc = 0;
            for (let i = 0; i < m_arrData.length; i+=m_incDBDataIdx) {
                // pathTemp.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].temp + 50) / 100) * m_h);
                // pathP.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].p) / 1000) * m_h);
                // pathHg.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].hg) / 100) * m_h);
                pathTemp.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].temp + 50) / 100) * m_h);
                pathP.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].p) / 1000) * m_h);
                pathHg.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].hg) / 100) * m_h);
                inc++;
                //console.log(i);
            }
            m_ctx.strokeStyle = m_clrTemp;
            m_ctx.stroke(pathTemp);
            m_ctx.strokeStyle = m_clrP;
            m_ctx.stroke(pathP);
            m_ctx.strokeStyle = m_clrHg;
            m_ctx.stroke(pathHg);

        },
    }
    return obj;
}

=======
function MyGraph (context, x, y, width, height) {
    const m_ctx = context;
    let m_name = 'MyGraph';
    let m_hFont = 10;
    let m_x = x;
    let m_y = m_ctx.canvas.height - y;
    let m_w = height;
    let m_h = width;
    let m_nMainVLine = 0;
    //let m_nMinVLine = 0;
    let m_nMainHLine = 10;
    let m_nMinHLine = 10;
    let m_wLine = 1;
    let m_incDBDataIdx = 1;
    let m_totVLine = 0;
    let m_totHLine = m_nMainHLine * m_nMinHLine;
    let m_dxVLine = 0; //m_w / m_totVLine;
    let m_dyHLine = m_h / m_totHLine;
    let m_iDMainL = [3, 5]; // index Data for Main Line [x-idxStart, x-len]
    let m_iDMinL = [0, 2]; // index Data for Main Line [x-idxStart, x-len]
    m_ctx.font = m_hFont + 'px Arial, Helvetica, sans-serif';
    let m_clrBckGnd = "#FFF9DB";
    let m_clrMainLine = '#AF9F52';
    let m_clrMinLine = "#C6C2B0";
    let m_clrTxt = '#000000';
    let m_clrTemp = '#fa0202';
    let m_clrP = '#00ff35';
    let m_clrHg = '#0255fa';
    let m_dashLine = [5, 2];
    //let m_data = new Date();
    let m_arrData = null;

    m_ctx.lineWidth = m_wLine;
    m_ctx.fillStyle = m_clrBckGnd;
    m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);
    m_ctx.fillStyle = m_clrTxt;
    m_ctx.textAlign = 'center';
    m_ctx.fillText("Нет данных для вывода(", m_w/2, m_h/2);

    const obj = {
        sayName() {
            console.log('Hi, I am a ', m_name + '.');
        },

        drawGraph(arrData, nRange)
        {
            m_ctx.fillStyle = m_clrBckGnd;
            m_ctx.fillRect(0, 0, m_ctx.canvas.width, m_ctx.canvas.height);
            if(arrData.length === 0)
            {
                m_ctx.fillStyle = m_clrTxt;
                m_ctx.fillText("Нет данных в базе(", m_w/2, m_h/2);
                return;
            }

            m_arrData = arrData;
            m_nMainVLine = nRange;
            let i = 24;
            for ( ; i > 0; i--) {
                if(24 % i === 0)
                {
                    m_dxVLine = m_w / (i * m_nMainVLine);
                    if(m_dxVLine > m_hFont) {
                        m_incDBDataIdx = 24 / i;
                        break;
                    }
                }
            }
            m_totVLine = (m_nMainVLine) * i;


            this.drawHLine();
            this.drawVLine();
            //this.drawData();
        },

        drawHLine() {
            let pathMainLine = new Path2D();
            let pathMinLine = new Path2D();
            m_ctx.textAlign = 'right';
            for (let i = 0; i <= m_totHLine; i++) {
                if (i % m_nMinHLine !== 0)
                {
                    pathMinLine.moveTo(m_x, m_y - (m_dyHLine * i));
                    pathMinLine.lineTo(m_x + m_w, m_y - (m_dyHLine * i));
                }
                else
                {
                    m_ctx.fillStyle = m_clrP;
                    m_ctx.fillText((i * 10).toString(), m_x - 3,  m_y - (m_dyHLine * i) - m_hFont);
                    m_ctx.fillStyle = m_clrHg;
                    m_ctx.fillText(i + "%", m_x - 3,  m_y - (m_dyHLine * i));
                    m_ctx.fillStyle = m_clrTemp;
                    m_ctx.fillText((-50 + (1 * i)) + "\u00b0" , m_x - 3,  m_y - (m_dyHLine * i) + m_hFont);

                    pathMainLine.moveTo(m_x, m_y - (m_dyHLine * i));
                    pathMainLine.lineTo(m_x + m_w, m_y - (m_dyHLine * i));
                }
            }
            m_ctx.strokeStyle = m_clrMinLine;
            m_ctx.setLineDash(m_dashLine);
            m_ctx.stroke(pathMinLine);

            m_ctx.strokeStyle = m_clrMainLine;
            m_ctx.setLineDash([]);
            m_ctx.stroke(pathMainLine);
            m_ctx.textAlign = 'left';
        },

        drawVLine() {
            let pathMainLine = new Path2D();
            let pathMinLine = new Path2D();
            let x = 0;
            let vLineStep = 24;

            m_ctx.save();
            m_ctx.textAlign = 'right';
            m_ctx.fillStyle = m_clrTxt;
            m_ctx.translate(0, m_ctx.canvas.height);
            let tmpY = m_x;
            m_ctx.rotate(-Math.PI / 2);

            for (let i = 0; i < m_arrData.length; i++) {
                let data = new Date(m_arrData[i]._id);
                let toffs =  data.getTimezoneOffset();
                data.setHours(data.getHours()+toffs/60);
                let dataStr =  ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;

                x = m_x + (m_dxVLine * i);
                //if (vLineStep % data.getDate() === 0)
                if (data.getHours() % vLineStep  === 0)
                {
                    var str2 = dataStr.substr(m_iDMainL[0], m_iDMainL[1]);
                    m_ctx.fillText(str2, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
                    pathMainLine.moveTo(x, m_y);
                    pathMainLine.lineTo(x, m_y - m_h);
                }
                else
                {
                    var str1 = dataStr.substr(m_iDMinL[0], m_iDMinL[1]);
                    m_ctx.fillText(str1, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
                    pathMinLine.moveTo(x, m_y);
                    pathMinLine.lineTo(x, m_y - m_h);
                }
            }

            // for (let i = 0; i <= m_totVLine; i++) {
            //     //if(i * m_incDBDataIdx >= m_arrData.length) break;
            //     let data = new Date(m_arrData[i]._id);
            //     let toffs =  data.getTimezoneOffset();
            //     data.setHours(data.getHours()+toffs/60);
            //     let dataStr =  ("0" + data.getHours()).slice(-2) + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100;

            //     x = m_x + (m_dxVLine * i);
            //     if (i % (m_totVLine / m_nMainVLine) === 0) //* m_totVLine)
            //     {
            //         //var str2 = m_arrData[i * m_incDBDataIdx].data.substr(m_iDMainL[0], m_iDMainL[1]);
            //         var str2 = dataStr.substr(m_iDMainL[0], m_iDMainL[1]);
            //         m_ctx.fillText(str2, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
            //         pathMainLine.moveTo(x, m_y);
            //         pathMainLine.lineTo(x, m_y - m_h);
            //     }
            //     else
            //     {
            //         //var str1 = m_arrData[i * m_incDBDataIdx].data.substr(m_iDMinL[0], m_iDMinL[1]);
            //         var str1 = dataStr.substr(m_iDMinL[0], m_iDMinL[1]);
            //         m_ctx.fillText(str1, m_x - 3, tmpY + (m_dxVLine * i) + (m_hFont / 2)); // x - +vert, y - +horz
            //         pathMinLine.moveTo(x, m_y);
            //         pathMinLine.lineTo(x, m_y - m_h);
            //         //console.log(i);
            //     }
            // }
            m_ctx.restore();
            m_ctx.strokeStyle = m_clrMinLine;
            m_ctx.setLineDash(m_dashLine);
            m_ctx.stroke(pathMinLine);

            m_ctx.strokeStyle = m_clrMainLine;
            m_ctx.setLineDash([]);
            m_ctx.stroke(pathMainLine);
        },

        drawData()
        {
            let pathTemp = new Path2D();
            let pathP = new Path2D();
            let pathHg = new Path2D();
            pathTemp.moveTo(m_x,m_y -  ((m_arrData[0].temp + 50) / 100) * m_h);

            let inc = 0;
            for (let i = 0; i < m_arrData.length; i+=m_incDBDataIdx) {
                // pathTemp.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].temp + 50) / 100) * m_h);
                // pathP.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].p) / 1000) * m_h);
                // pathHg.lineTo(m_x + m_dxVLine * i,m_y - ((m_arrData[i].hg) / 100) * m_h);
                pathTemp.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].temp + 50) / 100) * m_h);
                pathP.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].p) / 1000) * m_h);
                pathHg.lineTo(m_x + m_dxVLine * inc,m_y - ((m_arrData[i].hg) / 100) * m_h);
                inc++;
                //console.log(i);
            }
            m_ctx.strokeStyle = m_clrTemp;
            m_ctx.stroke(pathTemp);
            m_ctx.strokeStyle = m_clrP;
            m_ctx.stroke(pathP);
            m_ctx.strokeStyle = m_clrHg;
            m_ctx.stroke(pathHg);

        },
    }
    return obj;
}

>>>>>>> 2a0fb539426f2555a11c55a5160bc3335047bc1e
