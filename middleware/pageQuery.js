export const pageQuery = async (req,res,next) => {
    try {
        const { page, limit } = req.query;
        req.user = {...req.user, page: parseInt(page), limit: parseInt(limit)};
        next();
    } catch (err) {
        next(err);
    }
}