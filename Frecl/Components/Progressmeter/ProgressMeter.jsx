import React, {PropTypes} from "react";
import "./ProgressMeter.scss";

export default React.createClass({
  getDefaultProps() {
    return {
      step: 0,
      width: '100%'
    };
  },
  propTypes: {
    step: PropTypes.number.isRequired,
    width: PropTypes.string
  },
  makeGradient (percent, extra) {
    const gradientString = "linear-gradient(to right, #f15a24 " + percent + "%, #dedfe3 " + percent + "%)";
    const gradient = [`-moz-${gradientString}`,
          `-webkit-${gradientString}`,
          `-o-${gradientString}`,
          `-ms-${gradientString}`,
          gradientString];

    return {
      ...extra,
      background: gradient
    }
  },
  render() {
    const offsetPercentage = 100 / (this.props.children.length - 1);
    return (
      <div className="progress-meter" style={this.makeGradient(50, {})}>
        <ol className="progress-bar" style={this.makeGradient((this.props.step / (this.props.children.length - 1) * 100), { width: this.props.width + 'px' })}>
          {this.props.children.map(function(liElement, index){
            let stepStatus;
            switch (true) {
              case (index < this.props.step): stepStatus = "completed"; break;
              case (index === this.props.step): stepStatus = "current"; break;
              default: stepStatus = ""; break;
            }

            const offsetCss = {
              left: Math.floor(index * offsetPercentage).toString() + "%"
            };

            return <li key={index} style={offsetCss} className={stepStatus}>{liElement.props.children}</li>
          }, this)}
        </ol>
      </div>
    )
  }
});
