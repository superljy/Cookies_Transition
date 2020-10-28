const fs = require('fs');

//C:/Users/Administrator/AppData/Roaming/NSB/storage/sensorCookies.json
let expiresDateArr = [];
fs.readFile('./Cookies/sensorCookies.json', (err, data) => {
    if (err) {
        console.log(err.message);
        return;
    };
    let reg = /Expires=([\s\S]*GMT);/;
    let _data = JSON.parse(data);
    for (let i = 0; i < _data.length; i++) {
        let begin = _data[i].ts;
        let strExpires = _data[i].cookie.match(reg)[1];
        covertExpiresDate(begin, strExpires);
    }
    for (let i = 0; i < expiresDateArr.length; i++) {
        let timeExpires = `Expires=${expiresDateArr[i].expires};`;
        _data[i].cookie = _data[i].cookie.replace(reg, timeExpires);
        _data[i].ts = expiresDateArr[i].begin;
    }
    fs.writeFile('C:/Users/Administrator/AppData/Roaming/NSB/storage/sensorCookies.json', JSON.stringify(_data), (err) => {
        if (err) {
            console.log(err.message);
            return;
        };
        console.log('Import NSB success');
    });
    fs.writeFile('./Cookies/sensorCookies.json', JSON.stringify(_data), (err) => {
        if (err) {
            console.log(err.message);
            return;
        };
        console.log('Backup cookies success');
    })
})

function covertExpiresDate(begin, expires) {
    let beginDate = new Date(begin);
    let expiresDate = new Date(expires);
    beginDate = beginDate.setDate(beginDate.getDate() + 1);

    expiresDate = expiresDate.setDate(expiresDate.getDate() + 2);
    expiresDate = new Date(expiresDate).toUTCString();

    let dateObj = {
        begin: beginDate,
        expires: expiresDate
    }
    expiresDateArr.push(dateObj);
}
