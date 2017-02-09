import React from "react";
import classnames from "classnames";
import "./Video.scss";
import {VideoProps} from "./Vimeo"

export default ({videoId, className}:VideoProps) => {
  var videoUrl = "https://www.youtube.com/embed/" + videoId;
  var classes = classnames("video-container", className);
  return (
    <div className={classes}>
      <iframe className="video" src={videoUrl} frameBorder="0" allowFullScreen/>
    </div>
  );
};

