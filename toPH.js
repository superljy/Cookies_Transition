const fs = require('fs');
const express = require('express');

let app = express();

app.listen(3030, () => {
    console.log('listening 3030')
});

//to ph
let ftl_cookies = [];
let fa_cookies = [];
let eb_cookies = [];
let cs_cookies = [];
let kftl_cookies = [];
fs.mkdir('./phantom', err => {
    console.log(err);
});
fs.readFile('./Cookies/nsb.json', (err, data) => {
    if (err) {
        console.log(err);
    }
    let _data = JSON.parse(data);
    for (let i = 0; i < _data.length; i++) {
        let str = _data[i].cookie.match(/_abck=(\S*);/)[1];
        let site = _data[i].site_url.match(/(kidsfootlocker|footlocker|eastbay|champssports|footaction)/)[1];
        switch (site) {
            case 'footlocker':
                let ftl = {};
                ftl.cookie = str;
                ftl.site = 'FootLockerUS';
                ftl_cookies.push(ftl);
                break;
            case 'eastbay':
                let eb = {};
                eb.cookie = str;
                eb.site = 'EastBay';
                eb_cookies.push(eb);
                break;
            case 'champssports':
                let cs = {};
                cs.cookie = str;
                cs.site = 'ChampsSports';
                cs_cookies.push(cs);
                break;
            case 'footaction':
                let fa = {};
                fa.cookie = str;
                fa.site = 'FootAction';
                fa_cookies.push(fa);
                break;
            default:
                let kidsftl = {};
                kidsftl.cookie = str;
                kiesftl.site = 'KidsFootLocker';
                kftl_cookies.push(kidsftl);
                break;
        }
    }
    if (ftl_cookies.length > 0) {
        let file = `./phantom/${ftl_cookies[0].site}.json`;
        ph_covert(file, JSON.stringify(ftl_cookies));
    }
    if (fa_cookies.length > 0) {
        let file = `./phantom/${fa_cookies[0].site}.json`;
        ph_covert(file, JSON.stringify(fa_cookies));
    }
    if (eb_cookies.length > 0) {
        let file = `./phantom/${eb_cookies[0].site}.json`;
        ph_covert(file, JSON.stringify(eb_cookies));
    }
    if (cs_cookies.length > 0) {
        let file = `./phantom/${cs_cookies[0].site}.json`;
        ph_covert(file, JSON.stringify(cs_cookies));
    }
    if (kftl_cookies.length > 0) {
        let file = `./phantom/${kftl_cookies[0].site}.json`;
        ph_covert(file, JSON.stringify(kftl_cookies));
    }
});

function ph_covert(file, cookies) {
    fs.writeFile(file, cookies, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('transition done!');
    })
}