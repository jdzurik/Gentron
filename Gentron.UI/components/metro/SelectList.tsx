import * as React from "react";

type SelectListProps<T> = {
    collection: T[];
    onChange: (value: string) => any;
    textField: keyof T;
    value?: string;
    valueField: keyof T;
}

export default class SelectList<T> extends React.Component<SelectListProps<T>> {
    /*
     *  Constructors
     */
    public constructor(props: SelectListProps<T>) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <label className="select dropdown-toggle">
                <select data-role="select" data-role-select="true" onChange={console.log} onSelect={console.log}>
                    {
                        this.props.collection.map((item, i) => {
                            const value: string = item[this.props.valueField.toString()];
                            const extraProps = (value === this.props.value)
                                ? { selected: true }
                                : { }

                            return (
                                <option key={i} value={item[this.props.valueField.toString()]} {...extraProps}>
                                    {item[this.props.textField]}
                                </option>
                            );
                        })
                    }
                </select>
                <div className="button-group"></div>
                <div className="select-input">{this.props.value}</div>
                <div className="drop-container" data-role="dropdown" data-role-dropdown="true" style={{ display: `none` }}>
                    <div className="input">
                        <input type="text" data-role="input" placeholder="" className="" data-role-input="true" />
                        <div className="button-group">
                            <button className="button input-clear-button" tabIndex={-1} type="button">
                                <span className="default-icon-cross"></span>
                            </button>
                        </div>
                    </div>
                    <ul className="d-menu" style={{ maxHeight: `200px` }}>
                        {
                            this.props.collection.map((item, i) => {
                                const value: string = item[this.props.valueField.toString()];
                                const className = (value === this.props.value)
                                    ? `active`
                                    : null

                                return (
                                    <li key={i} data-text={item[this.props.textField]} data-value={item[this.props.valueField.toString()]} className="active">
                                        <a>CAUtils</a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </label>  
        );
    }
}