const Router = require('koa-router');

const {auth} = require('../middleware/auth.middleware');
const {validator} = require('../middleware/cart.middleware');
const {add} = require('../controller/cart.controller');

const router = new Router({prefix:'/carts'});

//添加购物车接口：登录  格式校验
router.post('/',auth,validator,add);

module.exports = router;