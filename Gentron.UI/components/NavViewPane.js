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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("object-hash");
var React = require("react");
var PackageSettings_1 = require("../actions/PackageSettings");
var redux_1 = require("redux");
var connect_1 = require("../connect");
var react_router_dom_1 = require("react-router-dom");
var NavViewPane = (function (_super) {
    __extends(NavViewPane, _super);
    function NavViewPane(props) {
        return _super.call(this, props) || this;
    }
    NavViewPane.prototype.render = function () {
        return (React.createElement("div", { className: "navview-pane h-100" },
            React.createElement("button", { className: "pull-button" },
                React.createElement("span", { className: "default-icon-menu" })),
            React.createElement("ul", { className: "navview-menu h-100" },
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-home" })),
                        React.createElement("span", { className: "caption" }, "Home"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/settings/project" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-drive2" })),
                        React.createElement("span", { className: "caption" }, "Project Settings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/connections/db", className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-database" })),
                        React.createElement("span", { className: "caption" }, "Connection Strings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/settings/package" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-gift" })),
                        React.createElement("span", { className: "caption" }, "Package Settings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/db" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-database" })),
                        React.createElement("span", { className: "caption" }, "Database Source"))),
                this.props.DatabaseSources.map(function (connection, i) {
                    return React.createElement("li", { key: i },
                        React.createElement(react_router_dom_1.Link, { to: "/sources/db/" + i, className: "pl-7" },
                            React.createElement("span", { className: "icon" },
                                React.createElement("span", { className: "mif-database" })),
                            React.createElement("span", { className: "caption" }, connection.Name)));
                }),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/file" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-file-code" })),
                        React.createElement("span", { className: "caption" }, "File Sources"))),
                this.props.FileSources.map(function (file, i) {
                    return React.createElement("li", { key: i },
                        React.createElement(react_router_dom_1.Link, { to: "/sources/file/" + i, className: "pl-7" },
                            React.createElement("span", { className: "icon" },
                                React.createElement("span", { className: "mif-file-code" })),
                            React.createElement("span", { className: "caption" }, file.Name)));
                }),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/http" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-http" })),
                        React.createElement("span", { className: "caption" }, "HTTP Sources"))),
                this.props.HttpSources.map(function (file, i) {
                    return React.createElement("li", { key: i },
                        React.createElement(react_router_dom_1.Link, { to: "/sources/http/" + i, className: "pl-7" },
                            React.createElement("span", { className: "icon" },
                                React.createElement("span", { className: "mif-http" })),
                            React.createElement("span", { className: "caption" }, file.Name)));
                }))));
    };
    NavViewPane = __decorate([
        connect_1.connect(mapStateToProps, mapDispatchToProps)
    ], NavViewPane);
    return NavViewPane;
}(React.Component));
exports.default = NavViewPane;
function mapStateToProps(state) {
    var _dbHash = hash(state.PackageSettings.DatabaseSources);
    var _fileHash = hash(state.PackageSettings.FileSources);
    var _httpHash = hash(state.PackageSettings.HttpSources);
    var _hash = hash(_dbHash + _fileHash + _httpHash);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
