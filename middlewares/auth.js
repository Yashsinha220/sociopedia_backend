const jwt = require('jsonwebtoken');


const verifytoken = async(req , res , next)=>{

    try {
        let token = req.header('Authorization');

            if(!token){
                return res.status(403).send('Access Denied')
            }
            // this will set on the frontend
            if(token.startswith('Bearer ')){
                token = token.slice(7 , token.length).trimLeft();
            }

            const verified = jwt.verify(token , 'somehardstring');
            req.user = verified; 
            next();
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}


module.exports = verifytoken;