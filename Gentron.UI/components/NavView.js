"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var connected_react_router_1 = require("connected-react-router");
var NavViewContent_1 = require("./NavViewContent");
var NavViewPane_1 = require("./NavViewPane");
var NavView = (function (_super) {
    __extends(NavView, _super);
    function NavView(props) {
        return _super.call(this, props) || this;
    }
    NavView.prototype.render = function () {
        return (React.createElement(connected_react_router_1.ConnectedRouter, { history: this.props.history },
            React.createElement("div", { "data-role": "navview" },
                React.createElement(NavViewPane_1.default, null),
                React.createElement(NavViewContent_1.default, null))));
    };
    return NavView;
}(React.Component));
exports.default = NavView;
