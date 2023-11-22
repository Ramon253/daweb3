const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})

app.use('/concesionarios', require('./routers/concesionario').router);
