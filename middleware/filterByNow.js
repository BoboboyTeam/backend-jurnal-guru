const filterByNow = (req, res, next) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    let date = new Date(dateStr);
    date = date.toLocaleDateString("id-ID", { weekday: 'long' }); 
    req.user.date = date;
    next();
};

export { filterByNow };