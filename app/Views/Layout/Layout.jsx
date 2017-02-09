import React from "react";
import {Row, Col} from "../../../Frecl/exports";
import "./layout.scss";
import classnames from "classnames";
import ButtonSpinner from '../../Components/ButtonSpinner/ButtonSpinner';
import ProgressWrapper from '../../../Frecl/Components/ProgressButtons/ProgressWrapper';
import ProgressButtons from '../../../Frecl/Components/ProgressButtons/ProgressButtons';
import ProgressItem from '../../../Frecl/Components/ProgressButtons/ProgressItem';
import ProgressButtonTemplate from '../../../Frecl/Components/ProgressButtons/ProgressButtonTemplate';

const Layout = () => {
    return (
        <div id="parent">
            <Row className="header"> 
                <h1>Create a Report</h1>
            </Row>

            <ProgressWrapper name="layout">
                
               {/*React.createElement(ProgressItem, {title: 0})*/}
               {/*React.cloneElement(React.createElement(ProgressItem, {title: 0}), {title: 5})*/}

               <div>
                <ProgressButtons template={ProgressButtonTemplate} />
                </div>

                <ProgressItem index="1" title="1">
                    Progress Item 1
                </ProgressItem>

                <ProgressItem index="2" title="2">
                    Progress Item 2
                </ProgressItem>
                <ProgressItem index="3" title="3">
                    Progress Item 3
                </ProgressItem>
                <ProgressItem index="4" title="4">
                    Progress Item 4
                </ProgressItem>
                <ProgressItem index="5" title="5">
                    Progress Item 5
                </ProgressItem>
                <ProgressItem index="6" title="6">
                    Progress Item 6
                </ProgressItem>
                <ProgressItem index="7" title="7">
                    Progress Item 7
                </ProgressItem>
            </ProgressWrapper>
        </div>
    );
};

export default Layout;