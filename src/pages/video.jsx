import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/video.css'
import videoSrc from '../assets/videos/KH Intro.mp4';

export default function Video() {
  return (
    <div className="app">
      <div className="container indexBody">
        <div className="row">
          <div className="col-md">
            <div className="ratio ratio-16x9">
              <video className="embed-responsive-item" src={videoSrc} controls allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
