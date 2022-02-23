const {createOrUpdate} = require('../service/cart.service')

class CartController {
    async add (ctx) {
        ctx.body = 'body';
        const user_id = ctx.state.user.id;
        const goods_id = ctx.request.body.goods_id;
        
        const res = await createOrUpdate(user_id,goods_id);
        ctx.body = {
            code:0,
            message:'添加到购物车成功',
            data:res
        }
    }
}

module.exports = new CartController();