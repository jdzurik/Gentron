import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLProps } from "react";
import { Link } from "react-router-dom";

interface BackButtonProps extends React.HTMLProps<HTMLAnchorElement> {
    routeTo: string;
    buttonClassName?: string;
    buttonText: string;
};

export default class BackButton extends React.PureComponent<BackButtonProps> {
    /*
     *  Constructors
     */
    public constructor(props?: BackButtonProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        let btnClassName: string = "button";

        if (this.props.buttonClassName && this.props.buttonClassName.length > 0) {
            btnClassName += ` ${this.props.buttonClassName}`;
        }

        return (
            <Link to={this.props.routeTo}>
                <button className={btnClassName}>
                    <span className="mif-arrow-left">&nbsp;</span>
                    {this.props.buttonText}
                </button>
            </Link>
        );
    }
}