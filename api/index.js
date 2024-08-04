const app = require('../app.js');

const PORT = process.env.PORT || 4000;

// app listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports= app;