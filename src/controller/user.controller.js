const jwt = require('jsonwebtoken');
const {createUser, getUserInfo,updateById} = require('../service/user.service');
const {userRegisterError} = require('../constant/error.type');
const {JWT_SECRET} = require('../config/config.default');

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
        const {user_name} = ctx.request.body;
        // ctx.body = `欢迎回来，${user_name}`;

        //1.获取用户信息（在token的payload中，记录id,user_name,is_admin）
        try {
            //从返回结果对象中剔除password属性，将剩下的属性放到res对象
            const {password,...res} = await getUserInfo({user_name});

            ctx.body = {
                code:0,
                message:'用户登录成功',
                data:{
                    token:jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
                }
            }
        } catch (error) {
            console.error('用户登录失败',err);
        }
    }

    async changePassword(ctx,next){
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        // console.log(id,password);
        if(await updateById({id,password})){
            ctx.body = {
                code:0,
                message:'修改密码成功',
                data:''
            }
        }else {
            ctx.body = {
                code:'10007',
                message:'修改密码失败',
                data:''
            }
        }
    }
}

module.exports = new UserController();