var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/waitertable_submit", upload.any(), function (req, res, next) {
  pool.query(
    "insert into waitertable (restaurantid, waiterid,floor, tableid, currentdate)values(?,?,?,?,?)",
    [
      req.body.restaurantid,
      req.body.waiterid,
      req.body.floor,
      req.body.tablenoid,
      req.body.currentdate,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "Database Error" });
      } else {
        res
          .status(200)
          .json({ status: true, message: " Waiter Table Added Successfully" });
      }
    }
  );
});

router.get("/fetch_all_waiters", function (req, res) {
  pool.query("select * from waiter", function (error, result) {
    if (error) {
      console.log(result);
      res
        .status(200)
        .json({ status: false, message: "Database Error", data: [] });
    } else {
      res.status(200).json({
        status: true,
        data: result,
        message: "Waiter Added Successfully",
      });
    }
  });
});

router.post("/fetch_all_tablebooking", function (req, res) {
  pool.query("select * from tablebooking", function (error, result) {
    if (error) {
      console.log(result);
      res
        .status(200)
        .json({ status: false, message: "Database Error", data: [] });
    } else {
      res.status(200).json({
        status: true,
        data: result,
        message: "Restaurant Added Successfully",
      });
    }
  });
});

router.post("/waitertable_edit_data", upload.any(), function (req, res, next) {
  pool.query(
    "update  waitertable  set  restaurantid=?, waiterid=?, floor=?, tableid=?, currentdate=? where  waitertableid=?",
    [
      req.body.restaurantid,
      req.body.waiterid,
      req.body.floor,
      req.body.tableid,
      req.body.currentdate,
      req.body.waitertableid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "Database Error" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "WaiterTable Updated Successfully" });
      }
    }
  );
});

// router.post("/fetch_all_waitertable", function (req, res) {
//   pool.query("select WT.*,(select W.waitername from waiters W where W.waiterid=WT.waiterid) as waitername, (select T.tableno from tablebooking T where T.tableid=WT.tableid) as tableno,(select T.floor from tablebooking T where T.tableid=WT.tableid) as floor from waitertable WT", function (error, result) {
//     if (error) {
//       console.log(result);
//       res
//         .status(200)
//         .json({ status: false, message: "Database Error", data: [] });
//     } else {
//       res
//         .status(200)
//         .json({
//           status: true,
//           data: result,
//           message: "WaiterTable Added Successfully",
//         });
//     }
//   });
// });

// "select F.*,(select C.categoryname from category C where C.categoryid =F.categoryid) as categoryname from fooditems F  where F.restaurantid=?",

router.get("/fetch_all_waitertable", function (req, res) {
  pool.query("select WT.*,(select W.waitername from waiter W where W.waiterid=WT.waiterid) as waitername ,(select T.tableno from tablebooking T where T.tableid=WT.tableid) as tableno ,(select T.floor from tablebooking T where T.tableid=WT.tableid) as floor  from waitertable WT ",
 
    function (error, result) {
      if (error) {
        console.log(error);
        res .status(200).json({ status: false, message: "Database Error", data: [] });
      } else {
        console.log(result);
        res.status(200).json({
          status: true,
          data: result,
          message: "WaiterTable Get Successfully",
        });
      }
    }
  );
});

router.post("/waitertable_delete", function (req, res, next) {
  pool.query(
    "delete from waitertable  where waitertableid=? ",
    [req.body.waitertableid],
    function (error, result) {
      if (error) {
        res.status(200).json({ status: false, message: "Server error...." });
      } else {
        res.status(200).json({
          status: true,
          message: "WaiterTable Deleted Succesfully...",
        });
      }
    }
  );
});

module.exports = router;
