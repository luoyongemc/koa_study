const Router = require('koa-router');

const router = new Router({prefix:'/address'});
const {auth} = require('../middleware/auth.middleware');
const {validator} = require('../middleware/addr.middle.ware');
const {create,findAll,update,remove,setDefault} = require('../controller/addr.controller');

router.post('/',auth,validator({
    consignee:'string',
    phone:{type:'string',format:/^\d{11}$/},
    address:'string'
}),create);
//获取地址列表
router.get('/',auth,findAll);
//更新地址
router.put('/:id',auth,validator({
    consignee:'string',
    phone:{type:'string',format:/^\d{11}$/},
    address:'string'
}),update)

//删除地址
router.delete('/:id',auth,remove);

//设置默认
router.patch('/:id',auth,setDefault);

module.exports = router;