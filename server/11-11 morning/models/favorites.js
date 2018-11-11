module.exports = function (sequelize, DataTypes) {
    return sequelize.define('fav', {
color: DataTypes.STRING,
bordercolor: DataTypes.STRING,
fSize: DataTypes.STRING,
owner: DataTypes.INTEGER
});
};