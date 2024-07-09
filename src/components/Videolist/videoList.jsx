import React from "react";
import VideoListItem from "./videoItem";
import "../../assets/styles/videoList.css";

const VideoList = ({ videos, handleVideoDeleted }) => {
  return (
    <div className="video-list" style={{ overflowY: "auto" }}>
      {videos.map((video, index) => (
        <VideoListItem key={index} video={video} handleVideoDeleted={handleVideoDeleted} />
      ))}
    </div>
  );
};

export default VideoList;
