import qrcode from 'qrcode-terminal';
import { getAllHost } from './util';
import chalk from 'chalk';
const allHost = getAllHost();

function createVitePluginQrcode(params) {

    let config = {};

    return {
        // 名称
        name: "vite-plugin-qrcode", // 取值为 serve 和 build
        //apply: "serve", // 获取 Alias config
        // enforce: 'post',
        // 生命周期之一：主要是拿 viteConfig 配置
        configResolved(viteConfig) {
            config = viteConfig;
        },
        configureServer(server) {
            console.log(2)
            server.middlewares.use((req, res, next) => {
                console.log(122222222222)
                createQrcode(params, config.server);
                next();
            });
        }
    }
}

function createQrcode(params, server) {
    console.log(111)
    const {small} = params;
    const content = getInputContent(params, server);
    const urls = renderUrl(content, server);
    urls.forEach((each) => {
        qrcode.generate(each, {small: small ?? true}, (qrcode) => {
            console.log(('------------qrcode------------'));
            console.log(`${chalk.green('[url]')} ${chalk.blue(each)} `);
            console.log(qrcode);
        });
    });
}

function getInputContent(params, server) {
    const {content} = params;
    const {host} = server;

    let input = [];

    if (content) {
        input = [content];
    } else {
        if (typeof host === 'boolean') {
            input = host ? allHost : ['localhost'];
        }

        if (typeof host === 'string') {
            input = host === '0.0.0.0' ? allHost : [host];
        }

        if (host === undefined) {
            input = ['localhost'];
        }
    }
    return input;
}

function renderUrl(input, server) {
    const {https, port, open} = server;
    const protocol = https ? 'https://' : 'http://';
    const postUrl = typeof open === 'string' ? open : '';
    return input.map((item) => {
        return postUrl.startsWith('/') ? `${protocol}${item}:${port}${postUrl}` : `${protocol}${item}:${port}/${postUrl}`;
    });
}

export default createVitePluginQrcode;
