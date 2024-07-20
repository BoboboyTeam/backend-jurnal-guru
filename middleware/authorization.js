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
    static async teacher(req,res,next){
        try{
            if(req.user.role === 'guru'){
                next()
            }
            else{
                throw {nama: 'User is not teacher'}
            }
        }
        catch(err){
            next(err)
        }
    }
}

export default Authorization