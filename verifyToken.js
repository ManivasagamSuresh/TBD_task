const jwt = require('jsonwebtoken');
const JWT_secret = process.env.JWT_TOKEN

const verifyToken = async(req,res,next)=>{
    try {
        const decodedToken = await jwt.verify(req.headers.authorization,JWT_secret,(err,user)=>{
            if(err){
                res.status(401).send("Unauthorised");
            }else{
                req.user = user;
                next()
            }
        });
            
    } catch (error) {
        res.status(401).send("Unauthorised");
    }
    
}





module.exports = {verifyToken};