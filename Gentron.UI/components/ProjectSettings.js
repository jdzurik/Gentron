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
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var metro_1 = require("./metro");
var NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
var ProjectSettings_1 = require("../actions/ProjectSettings");
var ProjectSettings = (function (_super) {
    __extends(ProjectSettings, _super);
    function ProjectSettings(props) {
        return _super.call(this, props) || this;
    }
    ProjectSettings.prototype.componentDidMount = function () {
    };
    ProjectSettings.prototype.render = function () {
        var _this = this;
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-drive2", title: "Project Settings" }),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Local Package Folder"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: "text", placeholder: "Local Package Folder", value: this.props.LocalPackageFolder, onChange: function (ev) { return _this.props.addOrUpdateLocalPackageFolder(ev); }, "data-role": "input", "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: this.props.addOrUpdateLocalPackageFolder.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Remote Package Location"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: "text", placeholder: "Remote Package Location", value: this.props.RemotePackageLocation, onChange: function (ev) { return _this.props.addOrUpdateRemotePackageLocation(ev); }, "data-role": "input", "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: this.props.addOrUpdateRemotePackageLocation.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Output Code Folder"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: "text", placeholder: "Output Code Folder", value: this.props.OutputCodeFolder, onChange: function (ev) { return _this.props.addOrUpdateOutputCodeFolder(ev); }, "data-role": "input", "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: this.props.addOrUpdateOutputCodeFolder.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))))));
    };
    return ProjectSettings;
}(React.Component));
function mapStateToProps(state) {
    return state.ProjectSettings;
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(ProjectSettings_1.ActionCreators, dispatch);
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProjectSettings);
