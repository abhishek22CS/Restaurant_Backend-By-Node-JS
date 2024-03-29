var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post('/restaurant_submit',upload.any(), function(req, res, next) {
    pool.query("insert into restaurant (restaurantname, ownername, phonenumber, emailid, mobileno, url, fssai, gstno, gsttype, filefssai, fileshopact, filelogo, adress, stateid, cityid, createdat, updatedat,password)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [ req.body.restaurantname,
         req.body.ownername,
          req.body.phonenumber,
           req.body.emailid,
           req.body.mobileno,
            req.body.url,
             req.body.fssai,
            
             req.body.gstno,
              req.body.gsttype,
               req.files[0].filename, req.files[1].filename, req.files[2].filename, req.body.address, req.body.stateid, req.body.cityid, req.body.createdat, req.body.updatedat,req.body.password],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Restaurant Added Successfully'})
    }
    
    })
    
     
    });

router.get('/fetch_all_restaurant',function(req,res )
    {

        pool.query('select * from restaurant',function(error,result)
        {
            if(error)
            {
                console.log(result)
                res.status(200).json({status:false,message:'Database Error',data:[]})
            
            }
            else
            {
                res.status(200).json({status:true,data:result,message:'Restaurant Added Successfully'})
            }
        })

    })
    
    router.post('/restaurant_edit_data',upload.any(), function(req, res, next) {
        pool.query("update  restaurant set restaurantname=?, ownername=?, phonenumber=?, emailid=?, mobileno=?, url=?, fssai=?, gstno=?, gsttype=?,  adress=?, stateid=?, cityid=?, updatedat=? where restaurantid=?",
        [ req.body.restaurantname,
             req.body.ownername,
              req.body.phonenumber,
               req.body.emailid, 
               req.body.mobileno,
                req.body.url,
                 req.body.fssai,
                
                 req.body.gstno,
                  req.body.gsttype,
                     req.body.address,
                      req.body.stateid,
                       req.body.cityid, 
                       req.body.updatedat,
                       req.body.restaurantid],function(error,result){
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
    router.post('/restaurant_edit_fssai',upload.any(), function(req, res, next) {
        pool.query("update restaurant set  filefssai=?  where restaurantid",
        [  
                   req.files[0].filename,req.body.restaurantid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'fssai Certificate updated Successfully'})
        }
        
        })
        
         
        });
        router.post('/restaurant_edit_shopact',upload.any(), function(req, res, next) {
            pool.query("update restaurant set  fileshopact=?  where restaurantid",
            [  
                       req.files[0].filename,req.body.restaurantid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database Error'})
            
            }
            else
            {
                res.status(200).json({status:true,message:'fssai Certificate updated Successfully'})
            }
            
            })
            
             
            });
            router.post('/restaurant_edit_logo',upload.any(), function(req, res, next) {
                pool.query("update restaurant set  filelogo=?  where restaurantid",
                [  
                           req.files[0].filename,req.body.restaurantid],function(error,result){
                if(error)
                {
                    console.log(error)
                    res.status(200).json({status:false,message:'Database Error'})
                
                }
                else
                {
                    res.status(200).json({status:true,message:'fssai Certificate updated Successfully'})
                }
                
                })
                
                 
                });
                router.post('/restaurant_delete',upload.any(), function(req, res, next) {
                    pool.query("delete from restaurant  where restaurantid=?",[req.body.restaurantid],function(error,result){
                    if(error)
                    {
                        console.log(error)
                        res.status(200).json({status:false,message:'Database Error'})
                    
                    }
                    else
                    {
                        res.status(200).json({status:true,message:'Restaurant Deleted Successfully'})
                    }
                    
                    })
                    
                     
                    });
                      
    module.exports = router;