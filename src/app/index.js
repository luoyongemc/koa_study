const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const router = require('../router/index');

const errHandler = require('./errHandle')

const app = new Koa();

app.use(koaBody({
    multipart:true,
    formidable:{
        //在配置选项option里，不推荐使用相对路径
        //在optionn里的相对路径，不是相对的当前文件，相对process.cwd()
        uploadDir:path.join(__dirname,'../upload'),//path.join获取的是当前文件的相对路径
        keepExtensions:true,//保留扩展名
    }
}));
app.use(KoaStatic(path.join(__dirname,'../upload')));
app.use(parameter(app));
app.use(router.routes());
app.use(router.allowedMethods());


//统一的错误处理
app.on('error',errHandler);

module.exports = app;