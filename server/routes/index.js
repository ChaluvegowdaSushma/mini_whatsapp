import * as Controller from "../app/controllers";
import * as Validation from "../utility/validator";

module.exports = (app) => {
    app.get('/', (req, res) => res.send(`API running fine`));

    app.get('/search-user', Validation.validateSearchUser, Controller.searchUser);
    app.get('/channel-list', Validation.validateGetChannelList, Controller.getChannelList);
};