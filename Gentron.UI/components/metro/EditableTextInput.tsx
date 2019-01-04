import * as React from "react";

type EditableTextInputProps = {
    confirm?: boolean;
    onTextChanged: (value: boolean) => any;
    text?: string;
    wrapper?: React.ComponentClass;
    wrapperProps?: any;
};

type EditableTextInputState = {
    editing?: boolean;
    hovering?: boolean;
};

export default class EditableTextInput extends React.Component<EditableTextInputProps, EditableTextInputState> {
    /*
     *  Constructor
     */
    public constructor(props: EditableTextInputProps) {
        super(props);
        this.state = {
            editing: false,
            hovering: false
        };
    }


    /*
     *  Methods
     */
    private handleChange(ev: React.ChangeEvent<HTMLInputElement>): void {
        this.props.onTextChanged(ev.target.checked);
    }

    private handleMouseOver(): void {
        this.setState((prevState) => {
            return {
                editing: prevState.editing,
                hovering: true
            };
        });
    }

    private handleMouseOut(): void {
        this.setState((prevState) => {
            return {
                editing: prevState.editing,
                hovering: false
            };
        });
    }

    private handleEditClick(): void {
        this.setState((prevState) => {
            return {
                editing: true,
                hovering: prevState.hovering
            };
        });
    }

    public render(): JSX.Element {
        if (!this.state.editing) {
            return (
                <this.props.wrapper {...this.props.wrapperProps} onMouseEnter={this.handleMouseOver.bind(this)} onMouseLeave={this.handleMouseOut.bind(this)}>
                    {this.props.text}
                    {
                        (this.state.hovering)
                            ? <button onClick={this.handleEditClick.bind(this)}>
                                <span className='mif-pencil'></span>
                            </button>
                            : null
                    }
                </this.props.wrapper>
            );
        }
        else {
            return (
                <input onChange={this.handleChange.bind(this)} value={this.props.text} />
            );
        }
    }
}