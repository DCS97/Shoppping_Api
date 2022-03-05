"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var constants_1 = require("./constants");
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.listen(constants_1.PORT, function () {
    console.log("starting app on: ".concat(constants_1.ADRESS));
});
app.get('/', function (req, res) {
    res.status(200).send('Server is working!');
});
