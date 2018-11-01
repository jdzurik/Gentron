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
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let Home = class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-database", title: "Home" }),
                React.createElement("pre", null, JSON.stringify(this.props.Gentron, null, 4)))));
    }
};
Home = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], Home);
exports.default = Home;
function mapStateToProps(state) {
    const _hash = hash(state);
    return {
        Gentron: state,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(Object.assign({}, PackageSettings_1.ActionCreators, ProjectSettings_1.ActionCreators), dispatch);
}
