const fs = require('fs');

module.exports = () => async (ctx, next) => {
    if (ctx.url === '/') {
        ctx.type = 'html';
        ctx.body = fs.readFileSync(`${process.cwd()}/public/index.html`, 'utf8');
    } else {
        await next();
    }
};
