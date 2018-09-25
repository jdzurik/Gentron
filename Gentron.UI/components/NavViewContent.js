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
var Home_1 = require("./Home");
var PackageSettings_1 = require("./PackageSettings");
var ProjectSettings_1 = require("./ProjectSettings");
var FileSources_1 = require("./FileSources");
var DatabaseSources_1 = require("./DatabaseSources");
var HttpSources_1 = require("./HttpSources");
var NavViewContent = (function (_super) {
    __extends(NavViewContent, _super);
    function NavViewContent(props) {
        var _this = _super.call(this, props) || this;
        _this._displayBlock = {
            display: "block"
        };
        _this._displayNone = {
            display: "none"
        };
        return _this;
    }
    NavViewContent.prototype.render = function () {
        return (React.createElement("div", { className: "navview-content d-flex flex-align-center flex-justify-center h-100" },
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/project", component: ProjectSettings_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/package", component: PackageSettings_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/db", component: DatabaseSources_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/http", component: HttpSources_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/file", component: FileSources_1.default })));
    };
    return NavViewContent;
}(React.Component));
exports.default = NavViewContent;
