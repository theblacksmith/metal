module.exports = function(app, passport, auth) {
    // serve index and view partials
    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);

    // JSON API
    app.get('/api/name', api.name);

    // redirect all others to the index (HTML5 history)
    app.get('*', routes.index);
};
