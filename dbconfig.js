const Sequelize=require('sequelize');

const db=new Sequelize({
    dialect:'mysql',
    host:'localhost',
    username:'rishu',
    password:'rishu',
    database:'shopping_site'
});

const messages=db.define('messages',{
    username:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    message:{
        type:Sequelize.STRING(50)
    }

})
module.exports={
    db,messages
}
