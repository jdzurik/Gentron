import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLProps } from "react";

interface RowProps extends React.HTMLProps<HTMLDivElement> { };

export default class Row extends React.PureComponent<RowProps> {
    public constructor(props?: RowProps) {
        super(props);
    }

    public render(): JSX.Element {
        let className: string = "";

        if (className.length === 0) {
            className = `row`;
        }

        if (this.props.className && this.props.className.length > 0) {
            className += ` ${this.props.className}`;
        }

        let props: HTMLProps<HTMLDivElement> = {};
        for (let key in this.props) {
            if (key in HTMLDivElement.prototype) {
                props[key] = this.props[key];
            }
        }
        props.className = className;

        return (
            <div {...props}>
                {this.props.children}
            </div>
        );
    }
}