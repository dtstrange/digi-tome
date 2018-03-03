module.exports = function(sequelize, DataTypes) {
    var BookLinks = sequelize.define("BookLinks", {
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }); 
    BookLinks.associate = function(models) {
        models.BookLinks.belongsTo(models.PublishedBooks, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return BookLinks; 
  };