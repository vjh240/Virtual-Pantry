var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SimpleRecipeSchema = new Schema(
{
	id:{type: String, required: true, unique: true},
	title:{type: String, required: true},
	image:{type: String, required: true},
	usedIngredientCount:{type: Number},
	missedIngredientCount:{type: Number},
	likes:{type: Number},
	calories:{type: Number},
	protein:{type: String},
	fat:{type: String},
	carbs:{type: String},

});


SimpleRecipeSchema
.virtual('url')
.get(function () {
  return '/simplerecipe/' + this.id;
});

module.exports = mongoose.model('SimpleRecipe', SimpleRecipeSchema);