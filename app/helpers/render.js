import Render from 'koa-ejs';

export default function render(app, config) {

    Render(app, config.render);
};