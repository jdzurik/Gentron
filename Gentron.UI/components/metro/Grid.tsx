import * as React from "react";
import { HTMLProps } from "react";

interface GridProps extends React.HTMLProps<HTMLDivElement> { };

export default class Grid extends React.PureComponent<GridProps> {
    /*
     *  Constructors
     */
    public constructor(props?: GridProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        let className: string = 'grid';

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