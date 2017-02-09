import React from "react";
import classnames from "classnames";

export default React.createClass({
    render() {
        var tableHeadings = () => {
            if (!this.props.tableHeaders) {
                return null;
            }
            return this.props.tableHeaders.map((value, index) => {
                if (!Object.isObject(value)) {
                    return <th key={index}>{value}</th>
                } else {
                    return <th colSpan={value.colSpan} key={index}>{value.heading}</th>
                }
            });
        };
        var mapChildren = () => {
            if (!this.props.children) {
                return null;
            }
            const safeChildren = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

            return safeChildren.map((value, index) => {
                if (value === null) {
                    return null;
                }
                return React.cloneElement(value, {
                    tableHeaders: this.props.tableHeaders,
                    key: index
                });
            })
        };
        var displayTbody = () => {
            if (this.props.noTbody) {
                return mapChildren();
            } else {
                return (
                    <tbody>
                    {mapChildren()}
                    </tbody>
                )
            }
        };

        var classes = classnames(this.props.className);

        return (
            <table className={classes}>
                <thead>
                <tr>
                    {tableHeadings()}
                </tr>
                </thead>
                {displayTbody()}
            </table>
        );
    }
});

