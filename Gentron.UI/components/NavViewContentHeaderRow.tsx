import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cell, Row } from "./metro";

type NavViewContentHeaderRowProps = {
    iconClassName?: string;
    title: string;
};

export default class NavViewContentHeaderRow extends React.Component<NavViewContentHeaderRowProps> {
    /*
     *  Constructors
     */
    public constructor(props?: NavViewContentHeaderRowProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Row>
                <Cell colSpan={12}>
                    <h3>
                        {
                            this.props.iconClassName && this.props.iconClassName.length > 0
                                ? <span className={`${this.props.iconClassName} mif-md mr-2`}></span>
                                : <span></span>
                        }
                        
                        {this.props.title}
                    </h3>
                </Cell>
            </Row>
        );
    }
}