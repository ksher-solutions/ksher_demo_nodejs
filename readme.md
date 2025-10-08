 
# 🧩 Ksher Example SDK nodejs

This project is an example implementation for **Node.js** using the **Ksher SDK**.  
For full API documentation, please visit: [api.ksher.net](http://api.ksher.net)

You can check [npm SDK NodeJs](https://www.npmjs.com/package/@kshersolution/ksher) or visit [Github ksher_sdk_nodejs repo](https://github.com/ksher-solutions/ksher_sdk_nodejs) to check only package files

## 📦 SDK Resources

| Language      | Repository                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js**   | [ksher_sdk_nodejs](https://github.com/ksher-solutions/ksher_sdk_nodejs) [![Version](https://img.shields.io/npm/v/@kshersolution/ksher)](https://www.npmjs.com/package/@kshersolution/ksher) |
| **Python**    | [ksher_sdk_python](https://github.com/ksher-solutions/ksher_sdk_python) [![Version](https://img.shields.io/pypi/v/ksher)](https://pypi.org/project/ksher/)                                  |
| **Java**      | [ksher-sdk/java](https://github.com/ksher-api/ksher-sdk/tree/master/java)                                                                                                                   |
| **Go**        | [ksher-sdk/go](https://github.com/ksher-api/ksher-sdk/tree/master/go)                                                                                                                       |
| **PHP**       | [ksher-sdk/php](https://github.com/ksher-api/ksher-sdk/tree/master/php)                                                                                                                     |
| **.NET Core** | [ksher-sdk/netcore](https://github.com/ksher-api/ksher-sdk/tree/master/netcore)                                                                                                             |


## 🚀 How to Install the Example Project
1. **Install Node.js**
Make sure Node.js is installed:
```shell
node -v
```
2. **Clone the Demo Repository**
```shell
git clone https://github.com/ksher-solutions/ksher_demo_nodejs.git
```
3. **Install Dependencies**
```shell
 cd ./ksher_demo_nodejs
 npm install
```
## ⚙️ Install Ksher SDK (Node.js)
**Option 1: Install from NPM**
```shell
npm install @kshersolution/ksher
```

**Option 2: Use Local SDK**
```shell
git clone https://github.com/ksher-solutions/ksher_sdk_nodejs
sudo npm link ./ksher_sdk_nodejs
```
## 🔧 Setup Configuration
Edit the configuration file at `./ksher_demo_nodejs/routes/config.js`
Example:
```js
const appid ="mch35000"; // your appid
const privatekey = "/Users/xxxxx/repo/ksher_demo_nodejs/Mch35000_PrivateKey.pem"; // privatekey path
const port = 3000; // port use to run demo
```

## ▶️ Run the Example
Start the demo:
```shell
 nodemon start
```
Then open your browser at 👉 http://127.0.0.1:3000

## 🔗 Example API Calls

For more APIs, please see the [Ksher API document](http://api.ksher.net)

The example Express server calls the `ksher_sdk_nodejs`.

### 🔰 Example: quick_pay
Run your server and execute:
```shell
curl --location --request POST 'http://127.0.0.1:5002/api/quick_pay' \
--header 'Content-Type: application/json' \
--data '{   "mch_order_no": 1759898309,
        "total_fee": "100",
        "fee_type": "THB",
        "auth_code": "287383764575786573",
        "channel": "alipayplus",
        "notify_url": "https://yourexample.ngrok-free.app/api/api/notify_url/",
}'
```
✅ Example Response: Payment Success
```json
{
    "code": 0,
    "data": {
        "appid": "mch28811",
        "attach": "",
        "cash_fee": 13,
        "cash_fee_type": "MYR",
        "channel": "alipayplus",
        "channel_order_no": "20231108194010800100188510282869308",
        "device_id": "",
        "fee_type": "THB",
        "ksher_order_no": "70020231108144112192582",
        "mch_order_no": "20231108133700",
        "nonce_str": "4970723599474fd93563f24f2735b2b2",
        "openid": "TNG1000004233742329",
        "operation": "QUICK-PAY",
        "operator_id": "13994",
        "rate": "1.000000",
        "result": "SUCCESS",
        "time_end": "2023-11-08 13:41:15",
        "total_fee": 100
    },
    "msg": "ok",
    "sign": "29c95f95063ec9631eca8c89679241e4c5f5752e91e13dd482069bf8a65b7003776f40ad14756cd66333667481aab4eff32c9bfaa4b958ee204476f350a41063",
    "status_code": "",
    "status_msg": "",
    "time_stamp": "2023-11-08T14:41:15.764956+08:00",
    "version": "3.0.0"
}
```
⌛ Example Response: Waiting for PIN
```json
{
    "code": 0,
    "data": {
        "err_code": "PAYMENT_IN_PROCESS",
        "err_msg": "payment in process",
        "ksher_order_no": "70020231108144615748821",
        "mch_order_no": "20231108134600",
        "nonce_str": "4970723599474fd93563f24f2735b2b2",
        "result": "NOTSURE"
    },
    "msg": "ok",
    "sign": "8585990347071de0d54dcb89626cf535924f4e93aa32cafe58615a94217cfad6f59467dfd519e8ca30c0d1f34705ee6b2277dd899d07c4abe5ad66196d89ce2a",
    "status_code": "",
    "status_msg": "",
    "time_stamp": "2023-11-08T14:46:23.355122+08:00",
    "version": "3.0.0"
}
```
### 🔰 Example: native_pay
Run your server and call:
```shell
curl --location --request POST 'http://127.0.0.1:3000/api/native_pay' \
--header 'Content-Type: application/json' \
--data '{
    "mch_order_no": 1759898047,
    "total_fee": "100",
    "fee_type":"THB",
    "channel": "promptpay",
    "product":1759898047,
    "device_id":"test01",
    "notify_url": "https://yourexample.ngrok-free.app/api/api/notify_url/",
}'
```
✅ Example Response: QR Code Payment
```json
{
    "code": 0,
    "data": {
        "PaymentCode": "00020101021230750016A0000006770101120115010556019950701022020230816172108374256030870029217530376454040.015802TH63046DC3",
        "PaymentID": "70020230816172108374256",
        "appid": "mch29217",
        "code_url": "00020101021230750016A0000006770101120115010556019950701022020230816172108374256030870029217530376454040.015802TH63046DC3",
        "device_id": "",
        "fee_type": "THB",
        "imgdat": "data:image/png;base64,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",
        "ksher_order_no": "70020230816172108374256",
        "mch_order_no": "20230816162700",
        "nonce_str": "90878866ae158dbec56351fd463c2717",
        "result": "SUCCESS",
        "stalls_name": "70029217",
        "total_fee": 1,
        "trade_type": "NATIVE"
    },
    "msg": "ok",
    "sign": "26b630dc9308695dfe82c5f5febc1f2456a887b1dea79a0bf8de5f432efdb7bd1f84a11f239ba978bf18d24c2d7288738b170560b732ba0dfd136b58adaf91a3",
    "status_code": "",
    "status_msg": "",
    "time_stamp": "2023-08-16T17:21:09.040692+08:00",
    "version": "3.0.0"
}
```

### 🔰 Example: gateway_pay
Run your server and call:
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
✅ Example Response: link to paid

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
🧠 Notes
For test environments, you can use ngrok to expose local endpoints.

## 🔗 Example fill in data to test on Website
### Example Website
goto http://localhost:3000/redirect
- create order by filling information
- page will redirect to payment page

### Example C Scan B
goto http://localhost:3000/cscanb
- create order by filling information
- page will display QR code

### Example B scan C
goto http://localhost:3000/bscanc
- create order by filling information
- it will display response information