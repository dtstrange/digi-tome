module.exports = function(sequelize, DataTypes) {
    var PublishedBooks = sequelize.define("PublishedBooks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }); 
    PublishedBooks.associate = function(models) {
        models.PublishedBooks.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        models.PublishedBooks.belongsTo(models.PurchasedBooks, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return PublishedBooks; 
  };