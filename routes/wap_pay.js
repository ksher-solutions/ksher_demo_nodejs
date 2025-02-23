var express = require("express");
const KsherPay = require("@kshersolution/ksher");
var bodyParser = require("body-parser");
const config = require("./config");
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("wap_pay", { title: "Example use for wap_pay" });
});

router.get("/success_page", function (req, res) {
  var mch_order_no = req.query.mch_order_no
  res.render("success_page", { title: "Ksher", mch_order_no:mch_order_no});
});

router.get("/fail_page", function (req, res) {
  var mch_order_no = req.query.mch_order_no
  res.render("fail_page", { title: "Ksher", mch_order_no:mch_order_no});
});

router.all("/create", async function (req, res, next) {
  const requestBody = {
    local_total_fee: req.body.local_total_fee,
    fee_type: req.body.fee_type,
    mch_order_no: req.body.mch_order_no,
    paypage_title: req.body.paypage_title,
    channel: req.body.channel,
    refer_url: req.body.refer_url,
    redirect_url: req.body.redirect_url,
    notify_url: req.body.notify_url,
    attach: req.body.attach,
  };
  console.log("requestBody: ", requestBody);
  try {
    await sdk.wap_pay(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      var url = response.data.pay_url;
      console.log("url: ", url);
      res.redirect(url);
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
  const requestBody_query = {
    mch_order_no: req.body.mch_order_no,
  };
  console.log("requestBody: ", requestBody_query);
  try {
    var response_query = await sdk.order_query(requestBody_query);
    // var ksher_order_no = response_query.data.ksher_order_no;
    if (response_query.data.result == "REFUND") {
      // remove this if use partial refund
      res.send("order have been refund!");
    }
    if (response_query.data.result != "SUCCESS") {
      res.send("order don't paid, please make sure order have paid");
    }
    const requestBody_refund = {
      mch_order_no: req.body.mch_order_no,
      mch_refund_no: req.body.mch_refund_no,
      total_fee: req.body.total_fee,
      fee_type: req.body.fee_type,
      refund_fee: req.body.refund_fee,
    };
  } catch (error) {
    return next(error);
  }

  try {
    await sdk.order_refund(requestBody_refund).then((response_refund) => {
      console.log("--------------------");
      console.log("body: ", response_refund);
      res.send(response_refund);
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
