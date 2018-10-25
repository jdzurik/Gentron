"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var metro_1 = require("../metro");
var react_split_pane_1 = require("react-split-pane");
var SplitPane = (function (_super) {
    __extends(SplitPane, _super);
    function SplitPane(props) {
        return _super.call(this, props) || this;
    }
    SplitPane.prototype.render = function () {
        var getClassNameFromProps = function (defaultClassName, propsClassName, noPropsClassName) {
            var className = defaultClassName || "";
            if (propsClassName && propsClassName.length > 0) {
                className += " " + propsClassName;
            }
            else if (noPropsClassName && noPropsClassName.length > 0) {
                className += " " + noPropsClassName;
            }
            return className;
        };
        var rowClassName = getClassNameFromProps("h-100", this.props.rowClassName, "mt-2");
        var cellClassName = getClassNameFromProps("", this.props.cellClassName);
        var wrapperClassName = getClassNameFromProps("h-100 w-100", "border bd-grayWhite border-size-2");
        return (React.createElement(metro_1.Row, { className: rowClassName },
            React.createElement(metro_1.Cell, { className: cellClassName },
                React.createElement("div", { className: wrapperClassName },
                    React.createElement(react_split_pane_1.default, __assign({}, this.props.splitPaneProps), this.props.children)))));
    };
    return SplitPane;
}(React.PureComponent));
exports.default = SplitPane;
