const fs = require('fs');

module.exports = () => async (ctx, next) => {
    if (ctx.url === '/') {
        ctx.type = 'html';
        ctx.body = fs.readFileSync(`${process.cwd()}/public/index.html`, 'utf8');
        const csp = ctx.response.headers['content-security-policy'];

        if (csp) {
            const modifiedCsp = csp.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'");
            ctx.set('Content-Security-Policy', modifiedCsp);
        }
    } else {
        await next();
    }
};
