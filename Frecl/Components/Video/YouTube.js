import React, {PropTypes} from "react";
import classnames from "classnames";
import "./Video.scss";

class YouTube extends React.Component {
  render() {
    const videoUrl = "https://www.youtube.com/embed/" + this.props.id;
    const classes = classnames("video-container", this.props.className);
    
    const videoStyle = {
      maxWidth: this.props.width,
      maxHeight: this.props.height,
    };

    return (
      <div className={classes}>
        <iframe className="video" style={videoStyle} src={videoUrl} frameBorder="0" allowfullscreen/>
      </div>
    );
  }
}

YouTube.PropTypes = {
  /* space-separated list of class names to apply to the video container  */
  className: PropTypes.string,
  /* id of the youtube video for e.g. the id = pPEv_hY_paA for https://www.youtube.com/watch?v=pPEv_hY_paA */
  id: PropTypes.string,
  /* the maximum width and maximum height of the video component - OPTIONAL */
  width: PropTypes.number,
  height: PropTypes.number,
};

export default YouTube;