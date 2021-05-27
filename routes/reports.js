const express = require('express');
const router = express.Router();

const {
	getReports,
	getReportById,
	createReport,
} = require('../controllers/reports');

const { protect, authorize } = require('../middlewares/auth');

router
	.route('/')
	.get(protect, authorize('admin', 'user'), getReports)
	.post(protect, authorize('admin', 'user'), createReport);
router.route('/:id').get(protect, getReportById);

module.exports = router;
