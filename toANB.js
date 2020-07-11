const fs = require('fs');
const express = require('express');

let app = express();

app.listen(3030, () => {
    console.log('listening 3030')
});

//to anb
let ftl_cookies = [];
let fa_cookies = [];
let eb_cookies = [];
let cs_cookies = [];
let kftl_cookies = [];
let ys_cookies = [];
fs.mkdir('./anb', err => {
    console.log(err);
});
fs.readFile('./Cookies/nsb.json', (err, data) => {
    if (err) {
        console.log(err);
    }
    let _data = JSON.parse(data);
    for (let i = 0; i < _data.length; i++) {
        let str = _data[i].cookie.match(/_abck=(\S*);/)[1];
        let site = _data[i].site_url.match(/(yeezysupply|kidsfootlocker|footlocker|eastbay|champssports|footaction)/)[1];
        switch (site) {
            case 'footlocker':
                ftl_cookies.push(str);
                break;
            case 'eastbay':
                eb_cookies.push(str);
                break;
            case 'champssports':
                cs_cookies.push(str);
                break;
            case 'footaction':
                fa_cookies.push(str);
                break;
            case 'yeezysupply':
                ys_cookies.push(str);
                break;
            default:
                kftl_cookies.push(str);
                break;
        }
    }
    if (ftl_cookies.length > 0) {
        ftl_cookies = ftl_cookies.join('\n');
        let file = `./anb/footlocker.txt`;
        anb_convert(file, ftl_cookies);
    }
    if (fa_cookies.length > 0) {
        fa_cookies = fa_cookies.join('\n');
        let file = `./anb/footaction.txt`;
        anb_convert(file, fa_cookies);
    }
    if (eb_cookies.length > 0) {
        eb_cookies = eb_cookies.join('\n');
        let file = `./anb/eastbay.txt`;
        anb_convert(file, eb_cookies);
    }
    if (cs_cookies.length > 0) {
        cs_cookies = cs_cookies.join('\n');
        let file = `./anb/champssports.txt`;
        anb_convert(file, cs_cookies);
    }
    if (kftl_cookies.length > 0) {
        kftl_cookies = kftl_cookies.join('\n');
        let file = `./anb/kidsfootlocker.txt`;
        anb_convert(file, kftl_cookies);
    }
    if (ys_cookies.length > 0) {
        ys_cookies = ys_cookies.join('\n');
        let file = `./anb/yeezysupply.txt`;
        anb_convert(file, ys_cookies);
    }
});

function anb_convert(file, cookies) {
    fs.writeFile(file, cookies, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('transition done!');
    })
}