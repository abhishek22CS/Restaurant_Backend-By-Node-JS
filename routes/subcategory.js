var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/subcategory_submit", upload.any(), function (req, res, next) {
  pool.query(
    "insert into fooditems( restaurantid, categoryid, foodname, foodtype, ingredients, price, offerprice, fileicon) values(?,?,?,?,?,?,?,?)",
    [
      req.body.restaurantid,
      req.body.categoryid,
      req.body.foodname,
      req.body.foodtype,
      req.body.ingredients,
      req.body.price,
      req.body.offerprice,
      req.files[0].filename,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "Database Error" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Food Added Successfully" });
      }
    }
  );
});
// pool.query("select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=?", function (error, result) {

router.post("/fetch_all_subcategory", function (req, res) {
  pool.query(
    "select F.*,(select C.categoryname from category C where C.categoryid =F.categoryid) as categoryname from fooditems F  where F.restaurantid=?",
    [req.body.restaurantid],
    function (error, result) {
      if (error) {
        console.log(result);
        res
          .status(200)
          .json({ status: false, message: "Database Error", data: [] });
      } else {
        res.status(200).json({
          status: true,
          data: result,
          message: "Sub category Added Successfully",
        });
      }
    }
  );
});

router.post("/subcategory_edit_data", upload.any(), function (req, res, next) {
  pool.query(
    "update  fooditems set restaurantid=? , categoryid=?, foodname=?,foodtype=?,ingredients=?,price=?, offerprice=?  where fooditemid=?",
    [
      req.body.restaurantid,
      req.body.categoryid,
      req.body.foodname,
      req.body.foodtype,
      req.body.ingredients,
      req.body.price,
      req.body.offerprice,
      req.body.fooditemid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "Database Error" });
      } else {
        res
          .status(200)
          .json({
            status: true,
            message: " Sub Category Updated Successfully",
          });
      }
    }
  );
});

//  router.get("/fetch_all_category", function (req, res) {
//   pool.query("select * from category", function (error, result) {
//     if (error) {
//       console.log(result);
//       res
//         .status(200)
//         .json({ status: false, message: "Database Error"  });
//     } else {
//       res
//         .status(200)
//         .json({
//           status: true,
//           data:result,

//           message: "category Added Successfully",
//         });
//     }
//   });
// });
router.post('/fetch_all_fooditem_categorywise',function(req,res){
  console.log(req.body)
  pool.query('select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=? and F.categoryid=?',[req.body.restaurantid,req.body.categoryid],function(error,result){
      if(error)
      {
          console.log(error)
          res.status(200).json({status:false,message:'Database Error',data:[]})
      
      }
      else
      {  console.log(result)
          res.status(200).json({status:true,data:result,message:'Fooditems Get Successfully'})
      }
  
  }) 
  })


module.exports = router;
