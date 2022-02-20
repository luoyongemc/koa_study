const {getUserInfo} = require('../service/user.service');
const {userFormateError,userAlreadyExited,userRegisterError} = require('../constant/error.type')
const userValidator = async (ctx,next) => {
    const {user_name,password} = ctx.request.body;

    //合法性
    if(!user_name || !password){
        console.error('用户名或密码为空',ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx);
        // ctx.status = 400;
        // ctx.body = {
        //     code:'10001',
        //     message:'用户名或密码为空',
        //     data:''
        // }
        return;
    }
    await next();
}

const verifyUser = async (ctx,next) => {
    const {user_name} = ctx.request.body;
    //合理性
    // if(await getUserInfo({user_name})) {
    //     ctx.app.emit('error',userAlreadyExited,ctx);
    //     // ctx.status = 409;
    //     // ctx.body = {
    //     //     code:'10002',
    //     //     message:'用户名已经存在',
    //     //     data:''
    //     // }
    //     return;
    // }

    try {
        const res = await getUserInfo({user_name});

        if(res) {
            console.error('用户名已经存在',{user_name});
            ctx.app.emit('error',userAlreadyExited,ctx);
            return;
        }
    } catch (error) {
        console.error('获取用户信息错误',err);
        ctx.app.emit('error',userRegisterError,ctx);
        return;
    }

    await next();
}

module.exports = {
    userValidator,
    verifyUser
}