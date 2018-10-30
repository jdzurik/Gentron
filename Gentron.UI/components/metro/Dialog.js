"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class DialogTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "dialog-title" }, this.props.children));
    }
}
exports.DialogTitle = DialogTitle;
class DialogContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "dialog-content" }, this.props.children));
    }
}
exports.DialogContent = DialogContent;
class DialogAction extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "dialog-actions" }, this.props.children));
    }
}
exports.DialogAction = DialogAction;
class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "dialog shadow-on", "data-role": "dialog", "data-role-dialog": "true", style: { top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`, minWidth: `480px` } }, this.props.children),
            React.createElement("div", { className: "overlay", style: { background: `rgba(0, 0, 0, 0.5)` } })));
    }
}
exports.Dialog = Dialog;
