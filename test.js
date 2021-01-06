const cook = new (require('./public/helpers')).CookiesMy();

const options =
    {
        p: { clr: '#00ff35', bDraw: true },
        t: { clr: '#C86F32', bDraw: true },
        h: { clr: '#00FFFF', bDraw: true }
    };

// const obj1 = { p: 30.5, h: 20.3, t: 50.9 };
const strObj1 = cook.CreateCookieString('drawData', options);
// const strObj1 = cook.SetData(obj1.p);

console.log(strObj1);
// console.log(typeof (options.p.clr));

const Obj2 = cook.GetData('drawData', strObj1);
console.log(Obj2);
