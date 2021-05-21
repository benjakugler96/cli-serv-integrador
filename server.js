const express = require('express');
const cors = require('cors');

const errorHandler = require('./middlewares/error');
const connectDb = require('./config/db');

require('dotenv').config({ path: './config/config.env' });

const app = express();
app.use(express.json());

// Security middleware
app.use(cors());

// Connect to mongo
connectDb();

// Error handler
app.use(errorHandler);

// Mount routes
app.use('/api/reports', require('./routes/reports'));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
