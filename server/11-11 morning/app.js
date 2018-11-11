require('dotenv').config();
var express = require('express');
var app = express();
var workcont = require('./controllers/workoutlogcontroller')
var favorites = require('./controllers/favoritescont')
var profilecont = require('./controllers/profilecont')
var user = require('./controllers/usercontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');
 
sequelize.sync();
// sequelize.sync({ force: true });

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', user);
app.use(require('./middleware/validate-session'));
app.use('/api/log', workcont);
app.use('/api/fav', favorites);
app.use('/api/profile', profilecont);

app.listen(3000, function(){
    console.log('App is listening on 3000.')
});