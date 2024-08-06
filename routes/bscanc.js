var express = require("express");
const KsherPay = require("@kshersolution/ksher");
var bodyParser = require("body-parser");
const config = require("./config");
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("bscanc", { title: "Example use for Website" });
});

router.all("/create", async function (req, res, next) {
  const requestBody = {
    auth_code: req.body.auth_code,
    total_fee: req.body.total_fee,
    fee_type: req.body.fee_type,
    mch_order_no: req.body.mch_order_no,
    channel: req.body.channel,
    product: req.body.product,
    device_id: req.body.device_id,
    notify_url: req.body.notify_url,
    attach: req.body.attach,
  };
  console.log("requestBody: ", requestBody);
  try {
    await sdk.quick_pay(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);

      res.send(response);
    });
  } catch (error) {
    return next(error);
  }
});

router.all("/query", async function (req, res, next) {
  const requestBody = {
    mch_order_no: req.body.mch_order_no,
  };
  console.log("requestBody: ", requestBody);
  try {
    await sdk.order_query(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      res.send(response);
    });
  } catch (error) {
    return next(error);
  }
});

router.all("/refund", async function (req, res, next) {

var requestBody = {
    mch_refund_no: req.body.mch_refund_no,
    total_fee: req.body.total_fee,
    fee_type: req.body.fee_type,
    refund_fee: req.body.refund_fee
  };
  if ("mch_order_no" in req.body)
    if(req.body.mch_order_no!='')
    requestBody = { ...requestBody, ...{mch_order_no: req.body.mch_order_no} };
  if ("ksher_order_no" in req.body )
    if(req.body.ksher_order_no!='')
    requestBody = { ...requestBody, ...{ksher_order_no: req.body.ksher_order_no} };
  console.log("requestBody: ", requestBody);
  try {
    await sdk.order_refund(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      res.send(response);
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
