const express = require('express');
const router = express.Router();

const {
	getReports,
	getReportById,
	createReport,
} = require('../controllers/reports');

const Report = require('../models/Report');

const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');

router
	.route('/')
	.get(protect, authorize('admin', 'user'), advancedResults(Report), getReports)
	.post(protect, authorize('admin', 'user'), createReport);
router.route('/:id').get(protect, getReportById);

module.exports = router;
