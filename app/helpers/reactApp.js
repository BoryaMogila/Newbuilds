export default function*(next) {


    yield this.render('index', {html: "hello world"});
}