"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const metro_1 = require("../metro");
const react_split_pane_1 = require("react-split-pane");
class SplitPane extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const getClassNameFromProps = (defaultClassName, propsClassName, noPropsClassName) => {
            let className = defaultClassName || "";
            if (propsClassName && propsClassName.length > 0) {
                className += ` ${propsClassName}`;
            }
            else if (noPropsClassName && noPropsClassName.length > 0) {
                className += ` ${noPropsClassName}`;
            }
            return className;
        };
        let rowClassName = getClassNameFromProps("h-100", this.props.rowClassName, "mt-2");
        let cellClassName = getClassNameFromProps("", this.props.cellClassName);
        let wrapperClassName = getClassNameFromProps("h-100 w-100", this.props.wrapperClassName, "border bd-grayWhite border-size-2");
        return (React.createElement(metro_1.Row, { className: rowClassName },
            React.createElement(metro_1.Cell, { className: cellClassName },
                React.createElement("div", { className: wrapperClassName },
                    React.createElement(react_split_pane_1.default, Object.assign({}, this.props.splitPaneProps), this.props.children)))));
    }
}
exports.default = SplitPane;
