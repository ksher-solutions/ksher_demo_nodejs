var express = require("express");
const KsherPay = require("@kshersolution/ksher");
var bodyParser = require("body-parser");
const config = require("./config");
var router = express.Router();

const sdk = new KsherPay(config.appid, config.privatekey);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cscanb", { title: "Example use for Website" });
});

router.all("/create", async function (req, res, next) {
  const requestBody = {
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
    await sdk.native_pay(requestBody).then((response) => {
      console.log("--------------------");
      console.log("body: ", response);
      var imgdat = response.data.imgdat;
      if (imgdat != null) {
        var base64Data = imgdat.replace(/^data:image\/png;base64,/, "");
        var img = Buffer.from(base64Data, "base64");

        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length,
        });
        res.end(img);
      } else {
        res.send(response);
      }
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
    var ksher_order_refund = response_query.data.ksher_order_no;
    if (response_query.data.result == "REFUND") {
      // remove this if use partial refund
      res.send("order have been refund!");
    }
    if (response_query.data.result != "SUCCESS") {
      res.send("order don't paid, please make sure order have paid");
    }
    const requestBody_refund = {
      ksher_order_no: ksher_order_refund,
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
