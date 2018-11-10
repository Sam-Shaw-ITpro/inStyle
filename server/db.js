const Sequelize = require('sequelize');
const sequelize = new Sequelize('inStyle', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() { 
        console.log('Connected to React inStyle postgres database');
    },
    function(err){ 
        console.log(err);
    }
); 
module.exports = sequelize;