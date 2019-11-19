// var reg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/;

// console.log(reg.test('192.10.1.1'));
// console.log(reg.test('192.-1.1.1'));
// console.log(reg.test('256.10.1.1'));

let obj = { name: '123', age: 18 }
for (let key in obj) {
    console.log(key, obj[key]);
}


let obj1 = {
    "BeltLength": 0.0,
    "BeltRPM": 0.0,
    "BeltVelocity": 0.0,
    "DrivenPulleyRPM": 0.0,
    "DriverPulleyRPM": 0.0,
    data: [
        { val1: '1x', val2: '0.00', val3: '0.00', val4: '0.00', },
        { val1: '2x', val2: '0.00', val3: '0.00', val4: '0.00', },
        { val1: '3x', val2: '0.00', val3: '0.00', val4: '0.00', },
        { val1: '4x', val2: '0.00', val3: '0.00', val4: '0.00', },
    ],
    "TransmissionRatio": 0.0
}


