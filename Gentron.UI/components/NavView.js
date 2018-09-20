"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var NavViewContent_1 = require("./NavViewContent");
var NavViewPane_1 = require("./NavViewPane");
var NavView = /** @class */ (function (_super) {
    __extends(NavView, _super);
    function NavView() {
        return _super.call(this, null) || this;
    }
    NavView.prototype.render = function () {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement("div", { "data-role": "navview" },
                React.createElement(NavViewPane_1.default, null),
                React.createElement(NavViewContent_1.default, null))));
    };
    return NavView;
}(React.Component));
exports.default = NavView;
