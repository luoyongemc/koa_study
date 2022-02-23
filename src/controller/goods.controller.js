const path = require('path');

const {fileUploadError,fileTypeError,publishGoodsError,invalidGoodsID} = require('../constant/error.type');
const {createGoods,updateGoods,deleteGoods,restoreGoods,findGoods} = require('../service/goods.service');

const fileTypes = ['image/jpeg','image/png'];

class GoodsController {
    async upload(ctx,next){
        console.log(ctx.request.files.file);
        const {file} = ctx.request.files;
        if(file){
            if(!fileTypes.includes(file.type)){
                return ctx.app.emit('error',fileTypeError,ctx);
            }
            ctx.body = {
                code:0,
                message:"商品图片上传成功",
                data:{
                    goods_img:path.basename(file.path)
                }
            };
        }else {
            return ctx.app.emit('error',fileUploadError,ctx);
        }
        
    }

    async create(ctx) {
        try {
            const {createAt,updateAt,...res} = await createGoods(ctx.request.body);
            ctx.body = {
                code:0,
                message:'发布商品成功',
                data:res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error',publishGoodsError,ctx);
        }
    }

    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id,ctx.request.body);
            if(res){
                ctx.body = {
                    code:0,
                    message:'修改商品成功',
                    data:''
                }
            }else {
                return ctx.app.emit('error',invalidGoodsID,ctx);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    async del(ctx) {
        try {
            const res = await deleteGoods(ctx.params.id);
            ctx.body ={
                code:0,
                message:'删除成功',
                data:''
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    async restore(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id);
            ctx.body = {
                code:0,
                message:'商品恢复上架成功',
                data:''
            }
        } catch (error) {
            
        }
    }

    async findAll(ctx) {
        const {pageNum = 1 ,pageSize = 10} = ctx.request.query;
        const res = await findGoods(pageNum,pageSize);
        console.log(res,111);
        ctx.body = {
            code:0,
            message:'查找成功',
            data:res
        }
    }
}

module.exports = new GoodsController();