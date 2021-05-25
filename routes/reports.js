const express = require('express');
const router = express.Router();

const {
	getReports,
	getReportById,
	createReport,
} = require('../controllers/reports');

const { protect } = require('../middlewares/auth');

router.route('/').get(protect, getReports).post(protect, createReport);
router.route('/:id').get(protect, getReportById);

module.exports = router;
