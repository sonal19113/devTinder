//code commit writing auth middleware

const adminAuth = (req,res,next)=>{
    //logic of authorization
    console.log("Authorization for admin");
    const authToken ="xyza"
    let isAdminAuthorized=false;
    if(authToken === "xyza"){
        isAdminAuthorized =true;
    }
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized");
    }else{
        next();
    }

}
const userAuth = (req,res,next)=>{
    //logic of authorization
    console.log("Authorization for user");
    const authToken ="xyza"
    let isAdminAuthorized=false;
    if(authToken === "xyza"){
        isAdminAuthorized =true;
    }
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized");
    }else{
        next();
    }

}

module.exports ={
    adminAuth,
    userAuth
}