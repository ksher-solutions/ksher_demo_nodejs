var express = require("express");
const KsherPay = require("@kshersolution/ksher");
var bodyParser = require("body-parser");
const config = require("./config");
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("redirect", { title: "Example use for Website" });
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
  var channel_list = req.body.channel_list.join();
  const requestBody = {
    total_fee: req.body.total_fee,
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
  console.log("requestBody: ", requestBody);
  try {
    await sdk.gateway_pay(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      var url = response.data.pay_content;
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
    await sdk.gateway_order_query(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      res.send(response);
    });
  } catch (error) {
    return next(error);
  }
});

router.all("/refund", async function (req, res, next) {
  if (req.body.mch_order_no != ""){
    const requestBody_query = {
      mch_order_no: req.body.mch_order_no,
    };
    console.log("requestBody: ", requestBody_query);
    try {
  
      var response_query = await sdk.gateway_order_query(requestBody_query);
      console.log("response_query: ", response_query);
      // var ksher_order_no = response_query.data.ksher_order_no;
      if (response_query.data.result == "REFUND") {
        // remove this if use partial refund
        res.send("order have been refund!");
      }
      if (response_query.data.result != "SUCCESS") {
        res.send("order don't paid, please make sure order have paid");
      }
  
      const requestBody_refund = {
        mch_order_no: response_query.data.pay_mch_order_no,
        mch_refund_no: req.body.mch_refund_no,
        total_fee: req.body.total_fee,
        fee_type: req.body.fee_type,
        refund_fee: req.body.refund_fee,
      };
  
      await sdk.order_refund(requestBody_refund).then((response_refund) => {
        console.log("--------------------");
        console.log("body: ", response_refund);
        res.send(response_refund);
      });
    } catch (error) {
      return next(error);
    }
  } else if (req.body.ksher_order_no != ""){
    try {
      const requestBody_query = {
        ksher_order_no: req.body.ksher_order_no,
      };
      console.log("requestBody: ", requestBody_query);
    
        var response_query = await sdk.order_query(requestBody_query);
        console.log("response_query: ", response_query);
        // var ksher_order_no = response_query.data.ksher_order_no;
        if (response_query.data.result == "REFUND") {
          // remove this if use partial refund
          res.send("order have been refund!");
        }
        if (response_query.data.result != "SUCCESS") {
          res.send("order don't paid, please make sure order have paid");
        }
  
      const requestBody_refund = {
        ksher_order_no: req.body.ksher_order_no,
        mch_refund_no: req.body.mch_refund_no,
        total_fee: req.body.total_fee,
        fee_type: req.body.fee_type,
        refund_fee: req.body.refund_fee,
      };
      console.log("requestBody: ", requestBody_refund);

      await sdk.order_refund(requestBody_refund).then((response_refund) => {
        console.log("--------------------");
        console.log("body: ", response_refund);
        res.send(response_refund);
      });
    } catch (error) {
      return next(error);
    }
  } 
  
});

module.exports = router;
