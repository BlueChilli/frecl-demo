import * as React from "react";
import {shallow, render} from "enzyme"
import ProgressMeter from "../ProgressMeter";

describe('<ProgressMeter/>', () => {
    it('should have gradient style rendered with all vender prefixes', () => {
        const wrapper = render(

            <ProgressMeter step={3} width="100" >
                <div>Step1</div>
                <div>Step2</div>
                <div>Step3</div>
            </ProgressMeter>
        );
        expect(wrapper.find(".progress-meter")).to.have.length(1);
        expect(wrapper.find(".progress-meter")).to.have.style("background")
            .equals("-moz-linear-gradient(to right, #f15a24 50%, #dedfe3 50%),-webkit-linear-gradient(to right, #f15a24 50%, #dedfe3 50%),-o-linear-gradient(to right, #f15a24 50%, #dedfe3 50%),-ms-linear-gradient(to right, #f15a24 50%, #dedfe3 50%),linear-gradient(to right, #f15a24 50%, #dedfe3 50%)");

    });

    it('should distribute offset value among children and should total up to 100%', () => {
        const wrapper = shallow(

            <ProgressMeter step={3} width="100" >
                <div>Step1</div>
                <div>Step2</div>
                <div>Step3</div>
            </ProgressMeter>
        );
        expect(wrapper.find("li").first()).to.have.style("left").equals("0%");
        expect(wrapper.find("li").last()).to.have.style("left").equals("100%");

    });

    it('should apply correct stepstatus class to steps', () => {
        const wrapper = shallow(

            <ProgressMeter step={1} width="100" >
                <div>Step1</div>
                <div>Step2</div>
                <div>Step3</div>
            </ProgressMeter>
        );
        expect(wrapper.find("li").first().hasClass("completed")).toBeTruthy();
        expect(wrapper.find("li").at(1).hasClass("current")).toBeTruthy();
        expect(wrapper.find("li").last()).to.not.have.className("current");
    });
});
