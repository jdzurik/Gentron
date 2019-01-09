import * as React from "react";

type SwitchProps = {
    checked: boolean;
    onStateChanged: (value: boolean) => any;
};

type SwitchState = {

};

export default class Switch extends React.Component<SwitchProps, SwitchState> {
    /*
     *  Constructor
     */
    public constructor(props: SwitchProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleChange(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onStateChanged(ev.target.checked);
    }

    public render(): JSX.Element {
        return (
            <input type='checkbox'
                data-role='switch'
                checked={this.props.checked}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}