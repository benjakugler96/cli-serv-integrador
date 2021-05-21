const Report = require('../models/Report');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @description Get all Reports
 * @route GET /api/reports
 * @access Public
 */
exports.getReports = asyncHandler(async (req, res, next) => {
	const reports = await Report.find({});
	res.status(200).json({
		success: true,
		data: reports,
	});
});

/**
 * @description Get one Report
 * @route GET /api/reports/:id
 * @access Public
 */
exports.getReportById = asyncHandler(async (req, res, next) => {
	const report = await Report.findById(req.params.id);

	if (!report) {
		return next(new ErrorResponse(`Report not found`, 404));
	}

	res.status(200).json({
		success: true,
		data: report,
	});
});

/**
 * @description Create new Report
 * @route POST /api/reports
 * @access Public
 */
exports.createReport = asyncHandler(async (req, res, next) => {
	// TODO: check if there is already a report with some unique data.

	const newReport = await Report.create(req.body);
	res.status(201).json({
		success: true,
		data: newReport,
	});
});

/**
 * @description Update Report
 * @route PUT /api/reports/:id
 * @access Public
 */
exports.updateReport = asyncHandler(async (req, res, next) => {
	let report = await Bootcamp.findById(req.params.id);

	if (!report) {
		return next(new ErrorResponse(`Report not found`, 404));
	}

	report = await Bootcamp.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		success: true,
		data: bootcamp,
	});
});
