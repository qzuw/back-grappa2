const agreements = require('./routes/agreements.js');
const theses = require('./routes/theses.js');
const index = require('./routes/index.js');
const app = require('../index.js');
const supervisors = require('./routes/supervisors.js');
const persons = require('./routes/persons.js');

module.exports = (app) => {

    app.use('/', index);
    app.use('/agreements', agreements);
    app.use('/theses', theses);
    app.use('/supervisors', supervisors);
    app.use('/persons', persons);

};

