const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000' ,"*"], // Replace with your frontend URL
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})