import React from "react";
import classnames from "classnames";
import "./Video.scss";

export default ({id, className}) => {
  var videoUrl = "https://player.vimeo.com/video/" + id;
  var classes = classnames("video-container", className);
  return (
    <div className={classes}>
      <iframe className="video" src={videoUrl} frameBorder="0" webkitAllowFullScreen mozAllowFullScreenallowFullScreen/>
    </div>
  );
};

