var RecipeDetail = require('../models/recipedetail.js')

exports.create_recipedetail = function(req, res, next) {

  var recipe = new RecipeDetail(
  	{
  		id: req.body.id,
  		title: req.body.title,
  		image: req.body.image,
  		vegetarian: req.body.vegetarian,
		vegan:req.body.vegan,
		glutenFree:req.body.glutenFree,
		dairyFree:req.body.dairyFree,
		veryHealthy:req.body.veryHealthy,
		cheap:req.body.cheap,
		veryPopular:req.body.veryPopular,
		sustainable:req.body.sustainable,
		weightWatcherSmartPoints:req.body.weightWatcherSmartPoints,
		gaps:req.body.gaps,
		lowFodmap:req.body.lowFodmap,
		ketogenic:req.body.ketogenic,
		whole30:req.body.whole30,
		servings:req.body.servings,
		sourceUrl:req.body.sourceUrl,
		spoonacularSourceUrl:req.body.spoonacularSourceUrl,
		aggregateLikes:req.body.aggregateLikes,
		creditText:req.body.creditText,
		creditsText:req.body.creditsText,
		sourceName:req.body.sourceName,
		extendedIngredients:req.body.extendedIngredients,
		readyInMinutes:req.body.readyInMinutes,
		imageType:req.body.imageType,
		instructions:req.body.instructions,
		analyzedInstructions:req.body.analyzedInstructions
	});

  RecipeDetail.findOne({id: req.body.id})
    .exec( function(err, found_recipe) {
           if (err) { return next(err); }

           if (found_recipe) {
             // Genre exists, redirect to its detail page.
             res.send('recipe exists');
           }
           else {

             recipe.save(function (err) {
               if (err) { return next(err); }
               // Genre saved. Redirect to genre detail page.
               res.send('good');
             });

           }

         })
};

// exports.read_simplerecipe = function(req, res, next) {

  

// };

// // Handle Genre create on POST.
// exports.genre_create_post =  [
   
//   // Validate that the name field is not empty.
//   body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  
//   // Sanitize (trim and escape) the name field.
//   sanitizeBody('name').trim().escape(),

//   // Process request after validation and sanitization.
//   (req, res, next) => {

//     // Extract the validation errors from a request.
//     const errors = validationResult(req);

//     // Create a genre object with escaped and trimmed data.
//     var genre = new Genre(
//       { name: req.body.id }
//     );


//     if (!errors.isEmpty()) {
//       // There are errors. Render the form again with sanitized values/error messages.
//       res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
//     return;
//     }
//     else {
//       // Data from form is valid.
//       // Check if Genre with same name already exists.
//       Genre.findOne({ 'name': req.body.name })
//         .exec( function(err, found_genre) {
//            if (err) { return next(err); }

//            if (found_genre) {
//              // Genre exists, redirect to its detail page.
//              res.redirect(found_genre.url);
//            }
//            else {

//              genre.save(function (err) {
//                if (err) { return next(err); }
//                // Genre saved. Redirect to genre detail page.
//                res.redirect(genre.url);
//              });

//            }

//          });
//     }
//   }
// ];
