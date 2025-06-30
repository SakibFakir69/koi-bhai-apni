"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const App = (0, express_1.default)();
const first_route_1 = __importDefault(require("../../routes/first.route"));
App.use('/api', first_route_1.default);
exports.default = App;
