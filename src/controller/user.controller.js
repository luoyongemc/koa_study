const {createUser} = require('../service/user.service');
const {userRegisterError} = require('../constant/error.type')

class UserController {
    async register(ctx,next){
        // console.log(ctx.request.body);
        const {user_name,password} = ctx.request.body;

        try {
            const res = await createUser(user_name,password);
            console.log(res);
            ctx.body = {
                status:0,
                message:'用户注册成功',
                data:{
                    id:res.id,
                    user_name:res.user_name
                }
            };
        } catch (error) {
            console.log(error);
            ctx.app.emit('error',userRegisterError,ctx);
        }

        
    }

    async login(ctx,next){
        ctx.body = '用户登录成功';
    }
}

module.exports = new UserController();