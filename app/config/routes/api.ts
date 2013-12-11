/*
* Serve JSON to our AngularJS client
*/

exports function name(req, res) {
  res.json({
    name: 'Bob'
  });
};