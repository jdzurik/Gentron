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
const ProjectSettings_1 = require("../actions/ProjectSettings");
const redux_1 = require("redux");
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let ProjectSettings = class ProjectSettings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-drive2", title: "Project Settings" }),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Local Package Folder"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement(metro_1.FolderInput, { onFolderPathChange: (value) => this.props.addOrUpdateLocalPackageFolder(value), placeholder: "Local Package Folder", value: this.props.LocalPackageFolder }))),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Remote Package Location"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: `text`, placeholder: `Remote Package Location`, value: this.props.RemotePackageLocation, onChange: (ev) => this.props.addOrUpdateRemotePackageLocation(ev.target.value || ``), "data-role": `input`, "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: `button`, onClick: this.props.addOrUpdateRemotePackageLocation.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: `button`, onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))))));
    }
};
ProjectSettings = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], ProjectSettings);
exports.default = ProjectSettings;
function mapStateToProps(state) {
    const _hash = hash(state.ProjectSettings);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        LocalPackageFolder: state.ProjectSettings.LocalPackageFolder,
        OutputPathGroups: state.ProjectSettings.OutputPathGroups,
        RemotePackageLocation: state.ProjectSettings.RemotePackageLocation,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(ProjectSettings_1.ActionCreators, dispatch);
}
