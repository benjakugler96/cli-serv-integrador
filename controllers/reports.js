const Report = require('../models/Report');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @swagger
 * components:
 *  schemas:
 *   Report:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Auto-generated if from mongodb
 *       business:
 *         type: string
 *         description: Business id related to report
 *       productsList:
 *         type: array
 *         description: List of all the products contained in the report.
 *         items:
 *           $ref: '#components/schemas/Product'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Auto-generated if from mongodb
 *       productName:
 *         type: string
 *         description: Product name.
 *       eanCode:
 *         type: string
 *         description: EAN code
 *       price:
 *         type: string
 *         description: Product price related to unit.
 *       unit:
 *         type: string
 *         description: Specifices the unit. Not related to quantityProduced or quantitySold.
 *       quantityProduced:
 *         type: number
 *         description: Amount of units produced.
 *       quanititySold:
 *         type: number
 *         description: Amount of units sold.
 *       report:
 *         description: Contains the information about the report in which this product has been added.
 *         type: object
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Business:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Auto-generated if from mongodb
 *       cuit:
 *         type: string
 *         description: Business CUIT.
 *       businessName:
 *         type: string
 *         description: Name of the business.
 *       report:
 *         type: object
 *         description: Last report filled by this Business.
 */

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: The Reports managing API
 */

/**
 * @swagger
 * /api/reports/:
 *   get:
 *     summary: Get all reports.
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Returns a list with all reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   description: List containing all reports.
 *                   items:
 *                     $ref: '#components/schemas/Report'
 *       401:
 *         description: Unauthorized user.
 */
exports.getReports = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by ID.
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: report id.
 *     responses:
 *       200:
 *         description: Returns one report by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: List containing all reports.
 *                   $ref: '#components/schemas/Report'
 *       401:
 *         description: Unauthorized user.
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
 * @swagger
 * /api/reports/:
 *   post:
 *     summary: Create a new report.
 *     tags: [Report]
 *     parameters:
 *       - in: body
 *         name: Report
 *         description: The report to create.
 *         type: object
 *         properties:
 *           business:
 *             type: string
 *             description: Business ID
 *             example: Business Name
 *           productsList:
 *             type: array
 *             description: List of products filled in the report.
 *             items:
 *               $ref: '#components/schemas/Product'
 *           dateAdded:
 *             type: string
 *             description: Date added.
 *             example: 1621974766794
 *           dateLimit:
 *             type: number
 *             description: Number of days the business have to fill the report. 10 by default.
 *             default: 10
 *           period:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *                 example: 2021
 *               month:
 *                 type: string
 *                 example: 05
 *     responses:
 *       200:
 *         description: Create a new report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Returns the new report generated.
 *                   $ref: '#components/schemas/Report'
 *       401:
 *         description: Unauthorized user.
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
