import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLProps } from "react";

interface CellProps extends React.HTMLProps<HTMLDivElement> {
    colSpan?: number;
    colSpanSm?: number;
    colSpanMd?: number;
    colSpanLg?: number;
    colSpanXl?: number;
    colSpanXxl?: number;
};

export default class Cell extends React.PureComponent<CellProps> {
    /*
     *  Constructors
     */
    public constructor(props?: CellProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        let className: string = "";

        if (this.props.colSpan && this.props.colSpan.toString().length > 0) {
            className += `cell-${this.props.colSpan}`;
        }

        if (this.props.colSpanSm && this.props.colSpanSm.toString().length > 0) {
            className += `cell-sm-${this.props.colSpanSm}`;
        }

        if (this.props.colSpanMd && this.props.colSpanMd.toString().length > 0) {
            className += `cell-md-${this.props.colSpanMd}`;
        }

        if (this.props.colSpanLg && this.props.colSpanLg.toString().length > 0) {
            className += `cell-lg-${this.props.colSpanLg}`;
        }

        if (this.props.colSpanXl && this.props.colSpanXl.toString().length > 0) {
            className += `cell-xl-${this.props.colSpanXl}`;
        }

        if (this.props.colSpanXxl && this.props.colSpanXxl.toString().length > 0) {
            className += `cell-xxl-${this.props.colSpanXxl}`;
        }

        if (className.length === 0) {
            className = `cell`;
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