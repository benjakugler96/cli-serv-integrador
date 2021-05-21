const express = require('express');
const router = express.Router();

const {
	getReports,
	getReportById,
	createReport,
} = require('../controllers/reports');

router.route('/').get(getReports).post(createReport);
router.route('/:id').get(getReportById);

module.exports = router;
