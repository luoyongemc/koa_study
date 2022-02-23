const {invalidGoodsID} = require('../constant/error.type')

const validator = async (ctx,next) => {
    try {
        ctx.verifyParams({
            goods_id:'number'
        })
    } catch (error) {
        console.error(error);
        invalidGoodsID.result = error;
        return ctx.app.emit('error',invalidGoodsID,ctx);
    }

    await next();
}


module.exports = {
    validator
}