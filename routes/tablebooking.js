var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post('/table_submit',upload.any(), function(req, res, next) {
    pool.query("insert into tablebooking (restaurantid, tableno, noofchairs, floor)values(?,?,?,?)",
    [ 
           req.body.restaurantid,req.body.tableno,req.body.noofchairs,req.body.floor],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'TableBooking Added Successfully'})
    }
    
    })
    
     
    });
    router.post('/fetch_all_floor',function(req,res){
        pool.query('select floor from tablebooking where restaurantid=? group by floor',[req.body.restaurantid],function(error,result){
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
        router.post('/fetch_all_table_by_floor',function(req,res){
            pool.query('select * from tablebooking where restaurantid=? and floor=?',[req.body.restaurantid,req.body.floor],function(error,result){
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

    router.post('/fetch_all_tablebook',function(req,res )
    {

        pool.query('select * from tablebooking where restaurantid=?',[req.body.restaurantid],function(error,result)
        {
            if(error)
            {
                console.log(result)
                res.status(200).json({status:false,message:'Database Error',data:[]})
            
            }
            else
            {
                res.status(200).json({status:true,data:result,message:'Table Booked Added Successfully'})
            }
        })

    })

    router.post('/table_edit_data',upload.any(), function(req, res, next) {
        pool.query("update  tablebooking  set    restaurantid=?, tableno=?, noofchairs=?, floor=? where tableid=?",
        [   req.body.restaurantid,
            req.body.tableno,
            req.body.noofchairs
            ,req.body.floor,
            req.body.tableid ],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'Restaurant Updated Successfully'})
        }
        
        })
        

    })

    router.post('/table_delete', function (req, res, next) {
        pool.query("delete from tablebooking  where tableid=? ",
            [req.body.tableid
            ], function (error, result) {
                if (error) {
                    res.status(200).json({ status: false, message: 'Server error....' })
                }
                else {
      
                    res.status(200).json({ status: true, message: 'Table Deleted Succesfully...' })
                }
      
            })
      });
       
    module.exports = router;
