const {createAddr,findAllAddr,updateAddr,removeAddr,setDefaultAddr} = require('../service/addr.service')

class AddrController {
    async create(ctx) {
        const user_id = ctx.state.user.id;
        const {consignee,phone,address} = ctx.request.body;

        const res = await createAddr({user_id,consignee,phone,address});

        ctx.body = {
            code: 0,
            message:'添加地址成功',
            data:res,
        }
    }

    async findAll(ctx) {
        const user_id = ctx.state.user.id;

        const res = await findAllAddr(user_id);

        ctx.body = {
            code: 0,
            message:'返回用户地址列表',
            data:res
        }
    }

    async update(ctx) {
        const id = ctx.request.params.id;

        const res = await updateAddr(id,ctx.request.body);

        ctx.body = {
            code:0,
            message:'更新地址成功',
            data:res
        }
    }

    async remove(ctx) {
        const id = ctx.request.params.id;

        const res = await removeAddr(id,ctx.request.body);

        ctx.body = {
            code:0,
            message:'删除地址成功',
            data:res
        }
    }

    async setDefault(ctx) {
        const user_id = ctx.state.user.id;
        const id = ctx.request.params.id;

        const res = await setDefaultAddr(user_id,id);

        ctx.body = {
            code: 0,
            message:'设置默认成功',
            data:res
        }
    }
    
}

module.exports = new AddrController();