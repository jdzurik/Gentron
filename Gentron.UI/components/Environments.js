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
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let Environments = class Environments extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAddEnvironmentClick() {
        const ouputPath = new Gentron_Library_1.Environment();
        ouputPath.Name = `Environment${this.props.Environments.length}`;
        this.props.addOrUpdateEnvironment(ouputPath);
    }
    handleToggleEnvironmentIsActiveClick(environment, isActive) {
        environment.IsActive = isActive;
        this.props.toggleActiveEnvironment(environment);
    }
    handleRemoveEnvironmentClick(Environment) {
        this.props.removeEnvironment(Environment);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-folder-open", title: "Environments" }),
                React.createElement("table", { className: "table striped table-border mt-4" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, ` `),
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Active?"),
                            React.createElement("th", null, ` `))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleAddEnvironmentClick.bind(this) }, "Add Environment")),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `)),
                        this.props.Environments.map((environment, i) => React.createElement("tr", { key: i },
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, environment.Name),
                            React.createElement("td", null,
                                React.createElement(metro_1.Switch, { checked: environment.IsActive, onStateChanged: (isActive) => this.handleToggleEnvironmentIsActiveClick(environment, isActive) })),
                            React.createElement("td", null,
                                React.createElement("a", { href: "#" },
                                    React.createElement("button", { className: "button", onClick: this.handleRemoveEnvironmentClick.bind(this, environment) }, "Remove"))))))))));
    }
};
Environments = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], Environments);
exports.default = Environments;
function mapStateToProps(state) {
    const _hash = hash(state.PackageSettings.Environments);
    return {
        Environments: state.PackageSettings.Environments,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
