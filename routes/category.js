var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/category_submit", upload.any(), function (req, res, next) {
  pool.query(
    "insert into category( restaurantid,  categoryname,icon, createdat, updatedat)values(?,?,?,?,?)",
    [
      req.body.restaurantid,
      req.body.categoryname,
      req.files[0].filename,
      req.body.createdat,
      req.body.updatedat,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "Database Error" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Category Added Successfully" });
      }
    }
  );

  router.post("/category_edit_data", upload.any(), function (req, res, next) {
    pool.query(
      "update  category set restaurantid=? , categoryname=?, updatedat=? where categoryid=?",
      [
        req.body.restaurantid,
        req.body.categoryname,
        req.body.updatedat,
        req.body.categoryid,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json({ status: false, message: "Database Error" });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Category Updated Successfully" });
        }
      }
    );
  });
});

router.post("/fetch_all_category", function (req, res) {
  pool.query("select * from category where restaurantid=?",[req.body.restaurantid], function (error, result) {
    if (error) {
      console.log(result);
      res
        .status(200)
        .json({ status: false, message: "Database Error", data: [] });
    } else {
      res
        .status(200)
        .json({
          status: true,
          data: result,
          message: "category Added Successfully",
        });
    }
  });
});

router.post('/delete_category_data', function (req, res, next) {
  pool.query("delete from category  where categoryid=? ",
      [req.body.categoryid
      ], function (error, result) {
          if (error) {
              res.status(200).json({ status: false, message: 'Server error....' })
          }
          else {

              res.status(200).json({ status: true, message: 'Category Deleted Succesfully...' })
          }

      })
});
module.exports = router;
