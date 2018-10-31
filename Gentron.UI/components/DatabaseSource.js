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
const react_monaco_editor_1 = require("react-monaco-editor");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
const SplitPane_1 = require("./SplitPane");
let DatabaseSource = class DatabaseSource extends React.Component {
    constructor(props) {
        super(props);
    }
    handleScriptFileNameChange(source, value) {
        source.Script.Path = value;
        this.props.addOrUpdateDatabaseSource(source);
    }
    handleActiveConnectionChange(ev) {
        this.props.DatabaseSource.ActiveConnectionGroup = this.props.DatabaseConnections.find(x => x.ID === ev.target.value);
        this.props.addOrUpdateDatabaseSource(this.props.DatabaseSource);
    }
    render() {
        const jsonEditorContainerId = `databaseSourceJsonResultsEditorContainer${this.props.match.params.id}`;
        const xmlEditorContainerId = `databaseSourceXmlResultsEditorContainer${this.props.match.params.id}`;
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-database", title: this.props.DatabaseSource.Name }),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement(metro_1.LinkButton, { buttonText: "View All Sources", iconClassName: "mif-arrow-left", linkTo: "/sources/db" }))),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement("select", { onChange: this.handleActiveConnectionChange.bind(this) }, this.props.DatabaseConnections.map((dbConn, i) => React.createElement("option", { key: i, value: dbConn.ID }, dbConn.Name))))),
                React.createElement(SplitPane_1.default, { splitPaneProps: { split: `vertical`, size: `calc(50% - 15px)` } },
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement(metro_1.Row, null,
                            React.createElement(metro_1.Cell, { colSpan: 4 },
                                React.createElement("div", { className: "pos-center text-right" }, "Database Script:")),
                            React.createElement(metro_1.Cell, { colSpan: 8 },
                                React.createElement(metro_1.FileInput, { onFilePathChange: (value) => this.handleScriptFileNameChange(this.props.DatabaseSource, value), value: this.props.DatabaseSource.Script.Path }))),
                        React.createElement(metro_1.Row, { className: "h-100 mt-1" },
                            React.createElement(metro_1.Cell, { className: "h-100" },
                                React.createElement(react_monaco_editor_1.default, { language: "sql", value: this.props.DatabaseSource.Script.Contents || (() => { }).toString(), options: { wordWrap: `on` }, onChange: () => { }, editorDidMount: () => { } })))),
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement("ul", { "data-role": "tabs", "data-expand": "true" },
                            React.createElement("li", null,
                                React.createElement("a", { href: `#${jsonEditorContainerId}` }, "JSON Results")),
                            React.createElement("li", null,
                                React.createElement("a", { href: `#${xmlEditorContainerId}` }, "XML Results"))),
                        React.createElement("div", { className: "h-100" },
                            React.createElement("div", { className: "h-100", id: jsonEditorContainerId },
                                React.createElement(react_monaco_editor_1.default, { editorDidMount: () => { }, language: "json", onChange: console.log, options: { readOnly: true, wordWrap: `on` }, value: `{\n\t"Data": "Execute Query to view JSON results"\n}` })),
                            React.createElement("div", { className: "h-100", id: xmlEditorContainerId },
                                React.createElement(react_monaco_editor_1.default, { editorDidMount: () => { }, language: "xml", onChange: console.log, options: { readOnly: true, wordWrap: `on` }, value: `<Root>\n\t<Data>Execute Query to view XML results</Data>\n</Root>` }))))))));
    }
};
DatabaseSource = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], DatabaseSource);
exports.default = DatabaseSource;
function mapStateToProps(state, routeComponentProps) {
    const id = routeComponentProps.match.params.id;
    const _hash = hash(state.PackageSettings.DatabaseSources[id] || "");
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        DatabaseSource: state.PackageSettings.DatabaseSources[id],
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(Object.assign({}, PackageSettings_1.ActionCreators, ProjectSettings_1.ActionCreators), dispatch);
}
