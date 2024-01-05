var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");



router.post('/waiter_submit',upload.any(), function(req, res, next) {
    pool.query("insert into waiter ( restaurantid, waitername, gender, dob, mobileno, emailid, address, picture )values(?,?,?,?,?,?,?,?)",
    [ 
           req.body.restaurantid,req.body.waitername,req.body.gender,req.body.dob,req.body.mobileno,req.body.emailid,req.body.address,req.files[0].filename],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Waiter Added Successfully'})
    }
    
    })
    
     
    });

    router.post('/fetch_all_waiter',function(req,res )
    {

        pool.query('select * from waiter where restaurantid=?',[req.body.restaurantid],function(error,result)
        {
            if(error)
            {
                console.log(result)
                res.status(200).json({status:false,message:'Database Error',data:[]})
            
            }
            else
            {
                res.status(200).json({status:true,data:result,message:'Waiter Added Successfully'})
            }
        })

    })








    
    router.post('/waiter_edit_data',upload.any(), function(req, res, next) {
        pool.query("update  waiter  set  restaurantid=?, waitername=?, gender=?, dob=?,mobileno=?,emailid=?,address=? where waiterid=?",
        [     req.body.restaurantid,
            req.body.waitername,
            req.body.gender,
            req.body.dob,
            req.body.mobileno,
            req.body.emailid,
            req.body.address, 
            req.body.waiterid ],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'Waiter Updated Successfully'})
        }
        
        })
        

    })

    
    router.post('/waiter_delete', function (req, res, next) {
        pool.query("delete from waiter  where waiterid=? ",
            [req.body.waiterid
            ], function (error, result) {
                if (error) {
                    res.status(200).json({ status: false, message: 'Server error....' })
                }
                else {
      
                    res.status(200).json({ status: true, message: 'Waiter Deleted Succesfully...' })
                }
      
            })
      });
      router.post('/waiter_edit_picture',upload.any(), function(req, res, next) {
        pool.query("update waiter set  picture=?  where waiterid",
        [  
                   req.files[0].filename,req.body.waiterid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'Picture updated Successfully'})
        }
        
        })
        
         
        });

    module.exports = router;
