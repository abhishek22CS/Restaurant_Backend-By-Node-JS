var multer = require("multer");
 
var serverpath = multer.diskStorage({
  destination: (req, file, path) => {
  
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    path(null, file.originalname);
    
  },
});
var upload = multer({ storage: serverpath });
module.exports = upload;


// var multer = require("multer");
 
// var serverpath = multer.diskStorage({
//   destination: (req, file, path) => {
  
//     path(null, "public/images");
//   },
//   filename: (req, file, path) => {
//     path(null, file.originalname);
    
//   },
// });
// var upload = multer({ storage: serverpath });
// module.exports = upload;
// var multer=require('multer')
// const { v4: uuidv4 } = require('uuid');
// var storage=multer.diskStorage({
//     destination:(req,file,path)=>
//     {
//         path(null,'public/images')}
//     ,
//     filename:(req,file,path)=>{
       
//        var ext=file.originalname.substring(file.originalname.lastIndexOf('.'))
//         path(null,uuidv4()+ext)}
    
// });

// var upload=multer({storage:storage})
// module.exports=upload