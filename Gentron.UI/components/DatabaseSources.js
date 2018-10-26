"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash = require("object-hash");
const React = require("react");
const PackageSettings_1 = require("../actions/PackageSettings");
const redux_1 = require("redux");
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const Gentron_Library_1 = require("../../Gentron.Library");
const react_router_dom_1 = require("react-router-dom");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let DatabaseSources = class DatabaseSources extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAddSourceClick() {
        const source = new Gentron_Library_1.DatabaseSource();
        source.Name = `DBSource${this.props.DatabaseSources.length}`;
        this.props.addOrUpdateDatabaseSource(source);
    }
    handleRemoveSourceClick(source) {
        this.props.removeDatabaseSource(source);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-database", title: "Database Sources" }),
                React.createElement("table", { className: "table striped table-border mt-4" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, ` `),
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Connections"),
                            React.createElement("th", null, ` `))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleAddSourceClick.bind(this) }, "Add Database Source")),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `)),
                        this.props.DatabaseSources.map((source, i) => React.createElement("tr", { key: i },
                            React.createElement("td", null,
                                React.createElement(react_router_dom_1.Link, { to: `/sources/db/${i}` },
                                    React.createElement("button", { className: "button" }, "View"))),
                            React.createElement("td", null, source.Name),
                            React.createElement("td", null, source.ActiveConnectionGroup.Connections.length),
                            React.createElement("td", null,
                                React.createElement("a", { href: "#" },
                                    React.createElement("button", { className: "button", onClick: this.handleRemoveSourceClick.bind(this, source) }, "Remove"))))))))));
    }
};
DatabaseSources = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], DatabaseSources);
exports.default = DatabaseSources;
function mapStateToProps(state) {
    const _hash = hash(state.PackageSettings.DatabaseSources);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
