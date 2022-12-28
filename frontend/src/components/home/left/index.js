import React, { useState } from 'react';
import LeftLink from './LeftLink';
import './style.css';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import Shortcut from './Shortcut';

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt={user?.first_name} />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((item, index) => (
        <LeftLink
          key={index}
          img={item.img}
          text={item.text}
          notification={item.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((item, index) => (
            <LeftLink
              key={index}
              img={item.img}
              text={item.text}
              notification={item.notification}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show Less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.linkedin.com/in/laurent-nizzoli-7b1296180/?originalSubdomain=fr"
          img="../../images/ytb.png"
          name="My Youtube Channel"
        />
        <Shortcut
          link="https://www.linkedin.com/in/laurent-nizzoli-7b1296180/?originalSubdomain=fr"
          img="../../images/insta.png"
          name="My Instagram"
        />
      </div>
      <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
        <Link to="/">Privacy </Link> <span>.</span>
        <Link to="/">Terms </Link> <span>.</span>
        <Link to="/">Advertising </Link> <span>.</span>
        <Link to="/">
          Ad Choice <i className="ad_choices_icon"></i>
        </Link>{' '}
        <span>.</span>
        <Link to="/">Cookies </Link> <span>.</span>
        <Link to="/">More </Link> <span>.</span> <br /> Meta @2022
      </div>
    </div>
  );
}
