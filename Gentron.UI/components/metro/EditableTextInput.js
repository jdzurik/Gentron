"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class EditableTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            hovering: false
        };
    }
    handleChange(ev) {
        this.props.onTextChanged(ev.target.checked);
    }
    handleMouseOver() {
        this.setState((prevState) => {
            return {
                editing: prevState.editing,
                hovering: true
            };
        });
    }
    handleMouseOut() {
        this.setState((prevState) => {
            return {
                editing: prevState.editing,
                hovering: false
            };
        });
    }
    handleEditClick() {
        this.setState((prevState) => {
            return {
                editing: true,
                hovering: prevState.hovering
            };
        });
    }
    render() {
        if (!this.state.editing) {
            return (React.createElement(this.props.wrapper, Object.assign({}, this.props.wrapperProps, { onMouseEnter: this.handleMouseOver.bind(this), onMouseLeave: this.handleMouseOut.bind(this) }),
                this.props.text,
                (this.state.hovering)
                    ? React.createElement("button", { onClick: this.handleEditClick.bind(this) },
                        React.createElement("span", { className: "mif-pencil" }))
                    : null));
        }
        else {
            return (React.createElement("input", { onChange: this.handleChange.bind(this), value: this.props.text }));
        }
    }
}
exports.default = EditableTextInput;
