module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hash: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING,
            //this relative link needs to be changed
            defaultValue: "/assets/images/defaultUser.png"
        },
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    }); 
    User.associate = function(models) {
      models.User.hasMany(models.PublishedBooks, {
          onDelete: "cascade"
      });
      models.User.hasMany(models.PurchasedBooks, {
          //not sure if this cascade is correct. in a many to many relationship, will it just remove its id from the other table? or will it delete the row regardless of whether other ids exist?
          onDelete: "cascade"
      });
    };
    return User; 
  };