var SimpleRecipe = require('../models/simplerecipe.js')

exports.create_simplerecipe = function(req, res, next) {

  console.log(req);
  var recipe = new SimpleRecipe(
  	{
  		id: req.body.id,
  		title: req.body.title,
  		usedIngredientCount: req.body.usedIngredientCount,
  		missedIngredientCount: req.body.missedIngredientCount,
  		likes: req.body.likes,
  		calories: req.body.calories,
  		protein: req.body.protein,
  		fat: req.body.fat,
  		carbs: req.body.carbs,
  		image: req.body.image,
  	});

  SimpleRecipe.findOne({id: req.body.id})
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
