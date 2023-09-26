 
# ksher example sdk nodejs

This project is Example for NodeJs. API Document Please check document at http://api.ksher.net

Another SDK please check at

Java: https://github.com/ksher-api/ksher-sdk/tree/master/java

Python: https://github.com/ksher-solutions/ksher_sdk_python

Go: https://github.com/ksher-api/ksher-sdk/tree/master/go

PHP: https://github.com/ksher-api/ksher-sdk/tree/master/php

Netcore: https://github.com/ksher-api/ksher-sdk/tree/master/netcore

[![Version](https://img.shields.io/npm/v/@kshersolution/ksher)](https://www.npmjs.com/package/@kshersolution/ksher)

NodeJs: https://github.com/ksher-solutions/ksher_sdk_nodejs

## How to install Example

- Install nodejs on you computer. Check your nodejs working with your computer by using

```shell
node -v
```
- Clone project from

```shell
git clone https://github.com/ksher-solutions/ksher_demo_nodejs.git
```
- Enter project and install package
```shell
 cd ./ksher_demo_nodejs
 npm install
```
### How to install ksher sdk nodejs
- Install `ksher_sdk_nodejs` by 

```shell
npm install @kshersolution/ksher
```
- in case you want to use by local path. clone from
```shell
git clone https://github.com/ksher-solutions/ksher_sdk_nodejs
sudo npm link ./ksher_sdk_nodejs
```

## setup your config
- goto `./ksher_demo_nodejs/routes/config.js` and edit file `config.js`

```js
const appid ="mch35000"; // your appid
const privatekey = "/Users/xxxxx/repo/ksher_demo_nodejs/Mch35000_PrivateKey.pem"; // privatekey path
const port = 3000; // port use to run demo
```

## run example
```shell
 nodemon start
```
and entry url "http://127.0.0.1:3000"

## Example call by API
- after run server you can call API by
```shell
curl --location 'http://127.0.0.1:3000/api/gateway_pay' \
--header 'Content-Type: application/json' \
--data '{
    "fee_type": "THB",
        "lang": "en",
        "channel_list": "promptpay",
        "product_name": "example product",
        "refer_url": "http://www.google.com",
        "mch_notify_url": "https://yourexample.ngrok-free.app/api/gateway_pay/notify_url/",
        "mch_order_no": "1695700117",
        "total_fee": 100,
        "mch_code": "1695700117",
        "mch_redirect_url": "https://yourexample.ngrok-free.app/api/gateway_pay/success/",
        "mch_redirect_url_fail": "https://yourexample.ngrok-free.app/api/gateway_pay/fail/",
        "attach": "1695700117"
}'
```
- it will response link to paid like

```json
{
    "code": 0,
    "data": {
        "pay_content": "https://gateway.ksher.com/page?order_uuid=49ba030e7e1711ea97e652540075451d"
    },
    "lang": "",
    "message": "SUCCESS",
    "msg": "SUCCESS",
    "sign": "6608b289c41550669d34236fd878045a5f95ad4a67b40988c4892ff71972ce2d809f453284b81c2c64dea5fbee826e6e81bf67a1644439a7e7917e555fbf8a9e"
}
```
for more API please check at Ksher API document https://api.ksher.net
example express will call `ksher_sdk_nodejs`

## Example website
create order
fill all of information
page will redirect to payment page