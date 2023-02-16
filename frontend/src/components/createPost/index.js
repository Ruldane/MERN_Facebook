import React from "react";
import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";

export default function CreatePost({ user, setVisible }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user.picture} alt="user" />
        <div
          className="open_post hover2"
          className="createPost_icon hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover2">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover2">
          <Photo color="#4bbf67" />
          Photo Video
        </div>
        <div className="createPost_icon hover2">
          <Feeling color="#f7b328" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
