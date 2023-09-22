var express = require('express');
const KsherPay = require('@kshersolution/ksher');
var bodyParser = require('body-parser')
const config = require('./config')
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', { title: 'Ksher' });
});

router.all('/notify_url', bodyParser.text(), async function(req, res) {
  
  const body = req.body;
  console.log("body: ", body);
  var jsonbody = JSON.parse(body);
  console.log("json body: ", jsonbody);
  if (sdk.verifySignature(jsonbody)){
    res.send({"result": "SUCCESS", "msg": "OK"});
  }
  else{
    res.send({"result": "Fail", "msg": "Fail"});
  }
    
});

router.all('/quick_pay', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.quick_pay(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.post('/native_pay', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.native_pay(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/order_query', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.order_query(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/order_refund', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.order_refund(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/order_reverse', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.order_reverse(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.post('/order_close', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.order_close(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/gateway_pay', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.gateway_pay(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/gateway_pay/success', async function(req, res) {
  const body = {mch_order_no: req.query.mch_order_no};
  console.log("body: ",body);
  
  await sdk.gateway_order_query(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/gateway_order_query', async function(req, res) {
  const body = req.body;
  console.log("body: ", body);
  await sdk.gateway_order_query(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.post('/cancel_order', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.cancel_order(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/mini_program_pay', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.mini_program_pay(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/refund_query', async function(req, res) {

  const body = req.body;
  console.log("body: ",body);
  
  await sdk.refund_query(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/payout', async function(req, res) {

  const body = req.body;
  console.log("body: ", body);
  await sdk.payout(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/order_query_payout', async function(req, res) {

  const body = req.body;
  console.log("body: ", body);
  await sdk.order_query_payout(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/get_payout_balance', async function(req, res) {

  const body = req.body;
  console.log("body: ", body);
  await sdk.get_payout_balance(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/merchant_info', async function(req, res) {

  const body = req.body;
  console.log("body: ", body);
  await sdk.merchant_info(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

router.all('/jsapi_pay', async function(req, res) {

  const body = req.body;
  console.log("body: ", body);
  await sdk.jsapi_pay(body)
    .then(response => {
      console.log("body: ",response);
      res.send(response);
    });
    
});

module.exports = router;
