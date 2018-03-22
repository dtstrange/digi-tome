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
        }
    }); 
    User.associate = function(models) {
      models.User.hasMany(models.PublishedBooks, {
          onDelete: "cascade"
      });
    };
    return User; 
  };