const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // Cache preflight requests for 24 hours
};

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.get('/health', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        dbStatus: 'Unknown'
    };

    try {
        // Check database connection
        const dbState = mongoose.connection.readyState;
        switch (dbState) {
            case 0:
                healthcheck.dbStatus = 'Disconnected';
                break;
            case 1:
                healthcheck.dbStatus = 'Connected';
                break;
            case 2:
                healthcheck.dbStatus = 'Connecting';
                break;
            case 3:
                healthcheck.dbStatus = 'Disconnecting';
                break;
            default:
                healthcheck.dbStatus = 'Unknown';
        }

        if (dbState !== 1) {
            throw new Error('Database connection not ready');
        }

        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error.message;
        healthcheck.error = error;
        res.status(503).send(healthcheck);
    }
});


app.use(requestLogger);
app.use(cors(corsOptions));
app.use(express.json()); //Body Parser
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});