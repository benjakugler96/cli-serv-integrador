const express = require('express');
const router = express.Router();

const {
	createBusiness,
	getAllBusiness,
	getBusinessById,
} = require('../controllers/business');

// const Report = require('../models/Report');

const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');

router.route('/').get(getAllBusiness).post(protect, createBusiness);
router.route('/:id').get(getBusinessById);

module.exports = router;
