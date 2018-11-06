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
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const Gentron_Library_1 = require("../../Gentron.Library");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let Environments = class Environments extends React.Component {
    constructor(props, state) {
        super(props);
        this.state = {
            EditingEnvironment: null
        };
    }
    handleAddEnvironmentClick() {
        this.handleOpenEditEnvironmentClick(new Gentron_Library_1.Environment());
    }
    handleToggleEnvironmentIsActiveClick(environment, isActive) {
        environment.IsActive = isActive;
        this.props.toggleActiveEnvironment(environment);
    }
    handleRemoveEnvironmentClick(Environment) {
        this.props.removeEnvironment(Environment);
    }
    handleOpenEditEnvironmentClick(environment) {
        this.setState({
            EditingEnvironment: environment.clone()
        });
    }
    handleEditEnvironmentNameChange(name) {
        const editingEnvironment = this.state.EditingEnvironment;
        editingEnvironment.Name = name;
        this.setState({
            EditingEnvironment: editingEnvironment
        });
    }
    handleCloseEditEnvironmentClick(save) {
        if (save) {
            this.props.addOrUpdateEnvironment(this.state.EditingEnvironment);
        }
        this.setState({
            EditingEnvironment: null
        });
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-earth", title: "Environments" }),
                React.createElement("table", { className: "table striped table-border mt-4" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Active?"),
                            React.createElement("th", null, ` `))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleAddEnvironmentClick.bind(this) },
                                    React.createElement("span", { className: "mif-add" }))),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `)),
                        this.props.Environments.map((environment, i) => React.createElement("tr", { key: i },
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: () => this.handleOpenEditEnvironmentClick(environment) },
                                    React.createElement("span", { className: "mif-pencil" })),
                                React.createElement("span", null,
                                    " ",
                                    environment.Name)),
                            React.createElement("td", null,
                                React.createElement(metro_1.Switch, { checked: environment.IsActive, onStateChanged: (isActive) => this.handleToggleEnvironmentIsActiveClick(environment, isActive) })),
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleRemoveEnvironmentClick.bind(this, environment) },
                                    React.createElement("span", { className: "mif-bin" })))))))),
            Gentron_Library_1.Utilities.hasValue(this.state.EditingEnvironment)
                ? (React.createElement(metro_1.Dialog, null,
                    React.createElement(metro_1.DialogTitle, null, "Edit Environment"),
                    React.createElement(metro_1.DialogContent, null,
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("label", null, "Connection Name"))),
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("input", { type: "text", "data-role": "input", "data-role-input": "true", onChange: (ev) => this.handleEditEnvironmentNameChange(ev.target.value), value: this.state.EditingEnvironment.Name })))),
                    React.createElement(metro_1.DialogAction, null,
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditEnvironmentClick.bind(this, false) }, "Cancel"),
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditEnvironmentClick.bind(this, true) }, "Save"))))
                : null));
    }
};
Environments = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps),
    __metadata("design:paramtypes", [Object, Object])
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
