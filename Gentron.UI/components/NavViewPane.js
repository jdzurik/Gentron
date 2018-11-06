"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash = require("object-hash");
const React = require("react");
const PackageSettings_1 = require("../actions/PackageSettings");
const redux_1 = require("redux");
const connect_1 = require("../connect");
const react_router_dom_1 = require("react-router-dom");
let NavViewPane = class NavViewPane extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                            React.createElement("span", { className: "mif-settings-ethernet" })),
                        React.createElement("span", { className: "caption" }, "Connection Strings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/environments", className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-earth" })),
                        React.createElement("span", { className: "caption" }, "Environments"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/output/paths", className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-folder-open" })),
                        React.createElement("span", { className: "caption" }, "Output Paths"))),
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
                this.props.DatabaseSources.map((connection, i) => React.createElement("li", { key: i },
                    React.createElement(react_router_dom_1.Link, { to: `/sources/db/${i}`, className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-database" })),
                        React.createElement("span", { className: "caption" }, connection.Name)))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/file" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-file-code" })),
                        React.createElement("span", { className: "caption" }, "File Sources"))),
                this.props.FileSources.map((file, i) => React.createElement("li", { key: i },
                    React.createElement(react_router_dom_1.Link, { to: `/sources/file/${i}`, className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-file-code" })),
                        React.createElement("span", { className: "caption" }, file.Name)))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/http" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-http" })),
                        React.createElement("span", { className: "caption" }, "HTTP Sources"))),
                this.props.HttpSources.map((file, i) => React.createElement("li", { key: i },
                    React.createElement(react_router_dom_1.Link, { to: `/sources/http/${i}`, className: "pl-7" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-http" })),
                        React.createElement("span", { className: "caption" }, file.Name)))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/engines/manage" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-drive-eta" })),
                        React.createElement("span", { className: "caption" }, "Template Engines"))),
                this.props.Engines.map((engine, i) => (React.createElement(React.Fragment, { key: i },
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: `/engines/manage/${i}`, className: "pl-7" },
                            React.createElement("span", { className: "icon" },
                                React.createElement("span", { className: "mif-drive-eta" })),
                            React.createElement("span", { className: "caption" }, engine.Name))),
                    engine.Templates.map((template, j) => React.createElement("li", { key: j },
                        React.createElement(react_router_dom_1.Link, { to: `/engines/manage/${i}/templates/${j}`, className: "pl-10" },
                            React.createElement("span", { className: "icon" },
                                React.createElement("span", { className: "mif-embed2" })),
                            React.createElement("span", { className: "caption" }, template.Name))))))))));
    }
};
NavViewPane = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps),
    __metadata("design:paramtypes", [Object])
], NavViewPane);
exports.default = NavViewPane;
function mapStateToProps(state) {
    const _dbHash = hash(state.PackageSettings.DatabaseSources);
    const _enginesHash = hash(state.PackageSettings.Engines);
    const _fileHash = hash(state.PackageSettings.FileSources);
    const _httpHash = hash(state.PackageSettings.HttpSources);
    const _hash = hash(_dbHash + _enginesHash + _fileHash + _httpHash);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        Engines: state.PackageSettings.Engines,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
