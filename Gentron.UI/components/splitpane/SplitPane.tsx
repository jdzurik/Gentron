import * as React from "react";
import { HTMLProps } from "react";
import { NonFunctionProperties } from "../../types";
import { Cell, Row } from "../metro";
import { Props, default as DefaultSplitPane } from "react-split-pane";

type SplitPaneProps = {
    rowClassName?: string;
    cellClassName?: string;
    wrapperClassName?: string;
    splitPaneProps: Props;
};

export default class SplitPane extends React.PureComponent<SplitPaneProps> {
    /*
     *  Constructors
     */
    public constructor(props?: SplitPaneProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        const getClassNameFromProps: (defaultClassName: string, propsClassName?: string, noPropsClassName?: string) =>
            string = (defaultClassName: string, propsClassName?: string, noPropsClassName?: string) => {
                let className = defaultClassName || "";

                if (propsClassName && propsClassName.length > 0) {
                    className += ` ${propsClassName}`;
                }
                else if (noPropsClassName && noPropsClassName.length > 0) {
                    className += ` ${noPropsClassName}`;
                }

                return className;
        } 

        let rowClassName: string = getClassNameFromProps("h-100", this.props.rowClassName, "mt-2");
        let cellClassName: string = getClassNameFromProps("", this.props.cellClassName);
        let wrapperClassName: string = getClassNameFromProps("h-100 w-100", "border bd-grayWhite border-size-2");

        return (
            <Row className={rowClassName}>
                <Cell className={cellClassName}>
                    <div className={wrapperClassName}>
                        <DefaultSplitPane {...this.props.splitPaneProps}>
                            {this.props.children}
                        </DefaultSplitPane>
                    </div>
                </Cell>
            </Row>
        );
    }
}