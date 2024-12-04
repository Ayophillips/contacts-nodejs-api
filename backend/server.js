const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');


connectDB();
const app = express();
const port = process.env.PORT || 5000;


app.use(requestLogger);
app.use(express.json()); //Body Parser
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});