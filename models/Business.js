const { model, Schema } = require('mongoose');

const BusinessSchema = new Schema({
	cuit: {
		type: String,
		require: true,
		unique: true,
		trim: true,
	},
	businessName: {
		type: String,
		require: true,
		trim: true,
	},
	report: {
		type: Schema.Types.ObjectId,
		ref: 'Report',
	},
});

module.exports = model('Business', BusinessSchema);
