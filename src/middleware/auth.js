function AdminAuth(req,res,next){
    console.log("checking for admin authorization");
    const token ="abcd";
    let isAdimAuthorized = false;
    if(token ==="abcd"){
        isAdimAuthorized =true;
    }

    if(!isAdimAuthorized){
        res.status(401).send("Unauthorized Adim");
    }
    next();
}

function userAuth(req,res,next){
    const token ="abcde1";
    let isUserAuthorized = false;
    if(token ==="abcde1"){
        isUserAuthorized =true;
    }

    if(!isUserAuthorized){
        res.status(401).send("Unauthorized User");
    }
    next();
}

module.exports ={
    AdminAuth,
    userAuth
}