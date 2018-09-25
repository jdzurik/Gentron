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
var NavViewPane_1 = require("./NavViewPane");
var Home_1 = require("./Home");
var PackageSettings_1 = require("./PackageSettings");
var ProjectSettings_1 = require("./ProjectSettings");
var FileSources_1 = require("./FileSources");
var DatabaseSources_1 = require("./DatabaseSources");
var HttpSources_1 = require("./HttpSources");
var connected_react_router_1 = require("connected-react-router");
var NavView = (function (_super) {
    __extends(NavView, _super);
    function NavView(props) {
        return _super.call(this, props) || this;
    }
    NavView.prototype.render = function () {
        return (React.createElement(connected_react_router_1.ConnectedRouter, { history: this.props.history },
            React.createElement("div", { "data-role": "navview" },
                React.createElement(NavViewPane_1.default, null),
                React.createElement("div", { className: "navview-content d-flex flex-align-center flex-justify-center h-100" },
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/project", component: ProjectSettings_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/package", component: PackageSettings_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/db/:id", component: DatabaseSources_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/http/:id", component: HttpSources_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/file/:id", component: FileSources_1.default })))));
    };
    return NavView;
}(React.Component));
exports.default = NavView;
