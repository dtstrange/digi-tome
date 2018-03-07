module.exports = function(sequelize, DataTypes) {
    var PurchasedBooks = sequelize.define("PurchasedBooks", {}); 
    PurchasedBooks.associate = function(models) {
        models.PurchasedBooks.belongsTo(models.PublishedBooks, {
            foreignKey: {
                allowNull: false
            }
        });
    
        models.PurchasedBooks.belongsToMany(models.User, { through: 'book_user' });
    };
    return PurchasedBooks; 
  };