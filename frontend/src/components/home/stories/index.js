import React from 'react';
import { ArrowRight, Plus } from '../../../svg';
import './style.css';
import { stories } from '../../../data/home';
import Story from './Story';

export default function Stories() {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          alt="default"
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#FFF" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
