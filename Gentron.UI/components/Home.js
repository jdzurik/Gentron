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
const ProjectSettings_1 = require("../actions/ProjectSettings");
const redux_1 = require("redux");
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const Gentron_Library_1 = require("../../Gentron.Library");
const react_json_tree_1 = require("react-json-tree");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let Home = class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.Gentron);
        const state = Gentron_Library_1.Utilities.JSON.deserialize(this.props.Gentron, Gentron_Library_1.Gentron);
        console.log(state);
        const taJson = Gentron_Library_1.Utilities.JSON.stringify({ ID: state.ID, PackageSettings: state.PackageSettings, ProjectSettings: state.ProjectSettings }, null, 4);
        console.log(taJson);
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-database", title: "Home" }),
                React.createElement(react_json_tree_1.default, { data: { ID: state.ID, PackageSettings: state.PackageSettings, ProjectSettings: state.ProjectSettings } }))));
    }
};
Home = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps),
    __metadata("design:paramtypes", [Object])
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
