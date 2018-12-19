var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecipeDetailSchema = new Schema(
{
	id:{type: String, required: true},
	title:{type: String, required: true},
	image:{type: String, required: true},
	vegetarian:{type: Boolean},
	vegan:{type: Boolean},
	glutenFree:{type: Boolean},
	dairyFree:{type: Boolean},
	veryHealthy:{type: Boolean},
	cheap:{type: Boolean},
	veryPopular:{type: Boolean},
	sustainable:{type: Boolean},
	weightWatcherSmartPoints:{type: Number},
	gaps:{type: String},
	lowFodmap:{type: Boolean},
	ketogenic:{type: Boolean},
	whole30:{type: Boolean},
	servings:{type: Number},
	sourceUrl:{type: String},
	spoonacularSourceUrl:{type: String},
	aggregateLikes:{type: Number},
	creditText:{type: String},
	creditsText:{type: String},
	sourceName:{type: String},
	extendedIngredients:{type: Array},
	readyInMinutes:{type: Number},
	imageType:{type: String},
	instructions:{type: String},
	analyzedInstructions:{type: Array}
});


RecipeDetailSchema
.virtual('url')
.get(function () {
  return '/recipedetail/' + this.id;
});

module.exports = mongoose.model('RecipeDetail', RecipeDetailSchema);