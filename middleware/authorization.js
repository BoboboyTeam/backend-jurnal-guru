class Authorization {
    static async admin(req,res,next){
        try{
            if(req.user.role === 'admin'){
                next()
            }
            else{
                throw {nama: 'User is not admin'}
            }
        }
        catch(err){
            next(err)
        }
    }
    static async guru(req,res,next){
        try{
            console.log("GUUURUURU",req.user.role)
            if(req.user.role === 'guru'){
                next()
            }
            else{
                throw {nama: 'User is not guru'}
            }
        }
        catch(err){
            next(err)
        }
    }
}

export default Authorization