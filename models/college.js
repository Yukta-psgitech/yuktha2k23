var mongoose = require("mongoose");
var collegeSchema = new mongoose.Schema(
    {
        collegeName: String,
		points: Number
    }
);
module.exports= mongoose.model("College", collegeSchema);