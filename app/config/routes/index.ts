/*
* GET home page.
*/
export function index(req, res){
    res.render('index', { title: 'Express' });
};

/*
 * Get a partial
 */
export function partials(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};