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
const connect_1 = require("../connect");
const metro_1 = require("./metro");
const react_monaco_editor_1 = require("react-monaco-editor");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
const SplitPane_1 = require("./SplitPane");
let HttpSource = class HttpSource extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-http", title: this.props.HttpSource.Name }),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement(metro_1.LinkButton, { buttonText: "View All Sources", iconClassName: "mif-arrow-left", linkTo: "/sources/http" }))),
                React.createElement(SplitPane_1.default, { splitPaneProps: { split: `vertical`, size: `calc(50% - 15px)` } },
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement(react_monaco_editor_1.default, { language: "javascript", value: (() => { }).toString(), options: { readOnly: true, wordWrap: `on` }, onChange: console.log, editorDidMount: () => { } })),
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement(react_monaco_editor_1.default, { language: "json", value: (() => { }).toString(), options: { readOnly: true, wordWrap: `on` }, onChange: console.log, editorDidMount: () => { } }))))));
    }
};
HttpSource = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], HttpSource);
exports.default = HttpSource;
function mapStateToProps(state, routeComponentProps) {
    const id = routeComponentProps.match.params.id;
    const _hash = hash(state.PackageSettings.HttpSources[id] || "");
    return {
        HttpSource: state.PackageSettings.HttpSources[id],
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
