module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
user : DataTypes.STRING,
fullname: DataTypes.STRING,
type: DataTypes.STRING,
});
};