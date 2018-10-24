import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLProps } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
    buttonClassName?: string;
    buttonText: string;
    iconClassName?: string;
    iconPosition?: "back" | "forward";
    linkTo: string;
};

export default class LinkButton extends React.PureComponent<LinkButtonProps> {
    /*
     *  Constructors
     */
    public constructor(props?: LinkButtonProps) {
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

        const icon: JSX.Element = (this.props.iconClassName && this.props.iconClassName.length > 0)
            ? <span className="mif-arrow-left">&nbsp;</span>
            : null;

        const iconPosition: string = this.props.iconPosition || "";

        return (
            <Link to={this.props.linkTo}>
                <button className={btnClassName}>
                    {
                        (icon && iconPosition.length === 0 || iconPosition === `back`)
                            ? icon
                            : null
                    }
                    {this.props.buttonText}
                    {
                        (icon && iconPosition.length > 0 && iconPosition === `front`)
                            ? icon
                            : null
                    }
                </button>
            </Link>
        );
    }
}