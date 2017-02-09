import Row from "../Row.jsx";
import Col from "../../Col/Col.jsx";
import React from "react";
import {shallow} from "enzyme";

describe('<Row/>', () => {
  it('should render users className', () => {
    const wrapper = shallow(
      <Row className="user-class">
        <Col cols="mobile-6">
          <div/>
        </Col>
      </Row>
    );
    expect(wrapper.hasClass('user-class')).toBe(true);
  });
  it('should render one <Col/>', () => {
    const wrapper = shallow(
      <Row className="user-class">
        <Col cols="mobile-6">
          <div/>
        </Col>
      </Row>
    );
    expect(wrapper.find(Col).length).toBe(1);
  });
  it('should render multiple <Col/>s', () => {
    const wrapper = shallow(
      <Row className="user-class">
        <Col cols="mobile-6">
          <div/>
        </Col>
        <Col cols="mobile-6">
          <div/>
        </Col>
      </Row>
    );
    expect(wrapper.find(Col).length).toBeGreaterThan(1);
  });
});
