var express = require('express');
const KsherPay = require('@kshersolution/ksher');
var bodyParser = require('body-parser')
const config = require('./config')
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('redirect', { title: 'Example use for Website' });
});

router.get('/success_page', function(req, res) {
  
  res.render('success_page', { title: 'Ksher' });
});

router.get('/fail_page', function(req, res) {
  
  res.render('fail_page', { title: 'Ksher' });
});

router.all('/create', async function(req, res,next) {
  var channel_list = req.body.channel_list.join();
  const requestBody = {
    total_fee : req.body.total_fee,
    fee_type: req.body.fee_type,
    mch_order_no: req.body.mch_order_no,
    product_name: req.body.product_name,
    channel_list: channel_list,
    mch_code: req.body.mch_code,
    mch_redirect_url: req.body.mch_redirect_url,
    mch_redirect_url_fail: req.body.mch_redirect_url_fail,
    mch_notify_url: req.body.mch_notify_url,
    refer_url: req.body.refer_url,
    attach: req.body.attach,
  };
  console.log("requestBody: ",requestBody);
  try {
    await sdk.gateway_pay(requestBody)
    .then(response => {
      console.log("--------------------",);
      console.log("body: ",response);
      var url=response.data.pay_content;
      console.log("url: ",url);
    res.redirect(url);
    });
  } catch (error) {
    return next(error);
  }
  
});

router.all('/query', async function(req, res,next) {
  const requestBody = {
    mch_order_no: req.body.mch_order_no
  };
  console.log("requestBody: ",requestBody);
  try {
    await sdk.order_query(requestBody)
    .then(response => {
      console.log("--------------------",);
      console.log("body: ",response);
    res.send(response)
    });
  } catch (error) {
    return next(error);
  }
  
});

module.exports = router;
