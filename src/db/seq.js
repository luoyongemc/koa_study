const {Sequelize} = require('sequelize');
const {MYSQL_HOST,MYSQL_PORT,MYSQL_USER,MYSQL_PWD,MYSQL_DB} = require('../config/config.default');


const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,//域名
    dialect:'mysql',//数据库类型
})

// seq.authenticate().then(() => {
//     console.log('database link success');
// }).catch((err) => {
//     console.log('database link failed:',err);
// })

module.exports = seq;