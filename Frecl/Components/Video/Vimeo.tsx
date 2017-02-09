import React from "react";
import classnames from "classnames";
import "./Video.scss";
import {BaseReactProps} from "../../types";

export interface VideoProps extends BaseReactProps {
  videoId: string
}

export default ({videoId, className}:VideoProps) => {
  var videoUrl = "https://player.vimeo.com/video/" + videoId;
  var classes = classnames("video-container", className);
  return (
    <div className={classes}>
      <iframe className="video" src={videoUrl} frameBorder="0" allowFullScreen/>
    </div>
  );
};

