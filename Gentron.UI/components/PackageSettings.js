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
const react_monaco_editor_1 = require("react-monaco-editor");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let PackageSettings = class PackageSettings extends React.Component {
    constructor(props) {
        super(props);
    }
    handleEditorMount(editor, monaco) {
    }
    render() {
        console.log("render");
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-gift", title: "Package Settings" }),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Package Name"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: `text`, placeholder: `Package Name`, value: this.props.PackageName, onChange: (ev) => this.props.addOrUpdatePackageName(ev.target.value || ``), "data-role": `input`, "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: `button`, onClick: this.props.addOrUpdatePackageName.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: `button`, onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))),
                React.createElement(metro_1.Row, { className: "h-100 mt-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement("div", { className: "h-100 w-100 border bd-grayWhite border-size-2" },
                            React.createElement(react_monaco_editor_1.default, { language: "markdown", value: this.props.ReadMe, options: { wordWrap: `on` }, onChange: (value) => this.props.addOrUpdateReadMeText(value) })))))));
    }
};
PackageSettings = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], PackageSettings);
exports.default = PackageSettings;
function mapStateToProps(state) {
    const _hash = hash(state.PackageSettings);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        Engines: state.PackageSettings.Engines,
        Environments: state.PackageSettings.Environments,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        PackageName: state.PackageSettings.PackageName,
        ReadMe: state.PackageSettings.ReadMe,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
