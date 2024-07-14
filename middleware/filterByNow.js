module.exports={
    filterByNow: (req,res,next) => {
        req.user.date = new Date();
        next();
    }
}