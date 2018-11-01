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
const ProjectSettings_1 = require("../actions/ProjectSettings");
const redux_1 = require("redux");
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const Gentron_Library_1 = require("../../Gentron.Library");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let DatabaseConnections = class DatabaseConnections extends React.Component {
    constructor(props, state) {
        super(props);
        this.state = {
            EditingConnectionGroup: null
        };
    }
    handleAddConnectionClick() {
        this.handleOpenEditConnectionClick(new Gentron_Library_1.ConnectionGroup());
    }
    handleRemoveConnectionClick(connectionGroup) {
        this.props.removeDatabaseConnectionGroup(connectionGroup);
    }
    handleOpenEditConnectionClick(connectionGroup) {
        this.setState({
            EditingConnectionGroup: connectionGroup.clone()
        });
    }
    handleEditConnectionNameChange(name) {
        const editingConnectionGroup = this.state.EditingConnectionGroup;
        editingConnectionGroup.Name = name;
        this.setState({
            EditingConnectionGroup: editingConnectionGroup
        });
    }
    handleEditConnectionStringChange(environment, connStr) {
        const editingConnectionGroup = this.state.EditingConnectionGroup;
        editingConnectionGroup.Connections.forEach((conn, i) => {
            if (conn.Environment === environment.Name) {
                conn.ConnectionString = connStr;
            }
        });
        this.setState({
            EditingConnectionGroup: editingConnectionGroup
        });
    }
    handleCloseEditConnectionClick(save) {
        if (save) {
            this.props.addOrUpdateDatabaseConnectionGroup(this.state.EditingConnectionGroup);
        }
        this.setState({
            EditingConnectionGroup: null
        });
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-settings-ethernet", title: "Database Connections" }),
                React.createElement("table", { className: "table striped table-border mt-4" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Connections"),
                            React.createElement("th", null, ` `))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleAddConnectionClick.bind(this) },
                                    React.createElement("span", { className: "mif-add" }))),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `)),
                        this.props.DatabaseConnections.map((connection, i) => React.createElement("tr", { key: i },
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: () => this.handleOpenEditConnectionClick(connection) },
                                    React.createElement("span", { className: "mif-pencil" })),
                                React.createElement("span", null,
                                    " ",
                                    connection.Name)),
                            React.createElement("td", null, connection.Connections.length),
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleRemoveConnectionClick.bind(this, connection) },
                                    React.createElement("span", { className: "mif-bin" })))))))),
            Gentron_Library_1.Utilities.hasValue(this.state.EditingConnectionGroup)
                ? (React.createElement(metro_1.Dialog, null,
                    React.createElement(metro_1.DialogTitle, null, "Edit Connection"),
                    React.createElement(metro_1.DialogContent, null,
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("label", null, "Connection Name"))),
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("input", { type: "text", "data-role": "input", "data-role-input": "true", onChange: (ev) => this.handleEditConnectionNameChange(ev.target.value), value: this.state.EditingConnectionGroup.Name }))),
                        this.props.Environments.map((env, i) => {
                            let currConnection = this.state.EditingConnectionGroup.Connections.filter(conn => conn.Environment === env.Name)[0];
                            if (!Gentron_Library_1.Utilities.hasValue(currConnection)) {
                                currConnection = new Gentron_Library_1.DatabaseConnection();
                                currConnection.Environment = env.Name;
                                this.state.EditingConnectionGroup.addOrUpdateConnection(currConnection);
                            }
                            return (React.createElement(React.Fragment, { key: i },
                                React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                                    React.createElement(metro_1.Cell, null,
                                        React.createElement("label", null,
                                            env.Name,
                                            " Connection String"))),
                                React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                                    React.createElement(metro_1.Cell, null,
                                        React.createElement("input", { type: "text", "data-role": "input", "data-role-input": "true", onChange: (ev) => this.handleEditConnectionStringChange(env, ev.target.value), value: currConnection.ConnectionString })))));
                        })),
                    React.createElement(metro_1.DialogAction, null,
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditConnectionClick.bind(this, false) }, "Cancel"),
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditConnectionClick.bind(this, true) }, "Save"))))
                : null));
    }
};
DatabaseConnections = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], DatabaseConnections);
exports.default = DatabaseConnections;
function mapStateToProps(state) {
    const _dbHash = hash(state.ProjectSettings.DatabaseConnections);
    const _envHash = hash(state.PackageSettings.Environments);
    const _hash = hash(_dbHash + _envHash);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        Environments: state.PackageSettings.Environments,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(Object.assign({}, PackageSettings_1.ActionCreators, ProjectSettings_1.ActionCreators), dispatch);
}
