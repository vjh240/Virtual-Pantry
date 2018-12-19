var Ingredient = require('../models/ingredient.js')

// Display list of all Authors.
// exports.ingredient_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: ingredient list');
// };

exports.ingredient_list = function(req, res, next) {

  Ingredient.find({},{'_id':0, 'iid':1, 'name':1})
    .sort([['name', 'ascending']])
    .exec(function (err, list_ingredients) {
      if (err) { return next(err); }
      //Successful, so render
      res.status(200).json(list_ingredients);
    });

};

// exports.ingredient_list = function(req, res, next) {

//   Book.find({}, 'title author')
//     .populate('author')
//     .exec(function (err, list_books) {
//       if (err) { return next(err); }
//       //Successful, so render
//       res.send('book_list', { title: 'Book List', book_list: list_books });
//     });
    
// };