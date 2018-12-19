var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IngredientSchema = new Schema(
{
	iid:{type: String, required: true},
	name:{type: String, required: true},
});

IngredientSchema
.virtual('ingredientname')
.get(function () {
  return this.name;
});

IngredientSchema
.virtual('ingredientid')
.get(function () {
  return this.iid;
});

IngredientSchema
.virtual('url')
.get(function () {
  return '/ingredient/' + this._id;
});

module.exports = mongoose.model('Ingredient', IngredientSchema);