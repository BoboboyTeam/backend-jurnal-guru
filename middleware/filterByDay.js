const filterByDay = (req, res, next) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    console.log(dateStr,"FILTER BU DAY");
    let hari = new Date(dateStr);
    hari = hari.toLocaleDateString("en-US", { weekday: 'long' }); 
    console.log(hari);
    req.user = {...req.user, hari};
    console.log(req.user);
    next();
};

export { filterByDay };