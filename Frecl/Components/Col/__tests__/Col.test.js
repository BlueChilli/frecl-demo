import Col from "../Col.jsx";
import React from "react";
import {shallow} from "enzyme";

const createExpectedClasses = (type) => [
  `mobile-${type}-6`,
  `tablet-${type}-8`,
  `desktop-${type}-12`
];

const expectedColsClasses = createExpectedClasses('col');
const expectedOffsetClasses = createExpectedClasses('offset');
const expectedPullClasses = createExpectedClasses('pull');
const expectedPushClasses = createExpectedClasses('push');

describe('<Col/>', () => {
  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Col cols="mobile-6">
        <div className="unique"/>
      </Col>
    );
    expect(wrapper.contains(<div className="unique"/>)).toBe(true);
  });
  it('should render correct column classes', () => {
    const wrapper = shallow(
      <Col cols="mobile-6 tablet-8 desktop-12">
        <div className="unique"/>
      </Col>
    );
    expect(expectedColsClasses.every(colClass => wrapper.hasClass(colClass))).toBe(true);
  });
  it('should render correct offset classes', () => {
    const wrapper = shallow(
      <Col cols="mobile-6" offset="mobile-6 tablet-8 desktop-12">
        <div className="unique"/>
      </Col>
    );
    expect(expectedOffsetClasses.every(offsetClass => wrapper.hasClass(offsetClass))).toBe(true);
  });
  it('should render correct pull classes', () => {
    const wrapper = shallow(
      <Col cols="mobile-6" pull="mobile-6 tablet-8 desktop-12">
        <div className="unique"/>
      </Col>
    );
    expect(expectedPullClasses.every(pullClass => wrapper.hasClass(pullClass))).toBe(true);
  });
  it('should render correct push classes', () => {
    const wrapper = shallow(
      <Col cols="mobile-6" push="mobile-6 tablet-8 desktop-12">
        <div className="unique"/>
      </Col>
    );
    expect(expectedPushClasses.every(pushClass => wrapper.hasClass(pushClass))).toBe(true);
  });
  it('should render users className', () => {
    const wrapper = shallow(
      <Col cols="mobile-6" className="user-class">
        <div className="unique"/>
      </Col>
    );
    expect(wrapper.hasClass('user-class')).toBe(true);
  });
});
