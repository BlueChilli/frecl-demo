import React from "react";

export default React.createClass({
    render() {
        return (
            <tr>
                {this.props.children.map((value, index) => {
                    if (Object.isObject(this.props.tableHeaders[index])) {
                        return React.cloneElement(value, {
                            'data-title': this.props.tableHeaders[index].heading,
                            onClick: this.props.onClick,
                            key: index
                        });
                    } else {
                        return React.cloneElement(value, {
                            'data-title': this.props.tableHeaders[index],
                            onClick: this.props.onClick,
                            key: index
                        });
                    }
                })}
            </tr>
        );
    }
});

