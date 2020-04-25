import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  LinkedinShareCount,
  RedditShareCount,
  FacebookIcon,
  
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon
} from 'react-share'
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { SocialIcon } from 'react-social-icons';
import { Link } from "gatsby";
import profilePic from '../../static/images/profile.jpg'
import styles from './About.module.scss'

const iconSize = 32;

const About = () => (
  <div>
    <h1>About the Author</h1>

    Hi, I'm Shane Jennings.

    <img
      className={styles.profilePicture}
      src={profilePic}
      alt="profile"
    />
    
    Feel free to contact me!


    <a
      href={`http://twitter.com/shanepjennings`}
      target="_blank"
      rel="noopener noreferrer"
    ><TwitterIcon round size={iconSize} />
    </a>
    <a
      href={`https://www.linkedin.com/in/shanepjennings/`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedinIcon round size={iconSize} />
    </a>
    <a
      href={`https://t.me/Shanejennings`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TelegramIcon round size={iconSize} />
    </a>
    <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="0" borderStyle="solid" icon="github" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(58,57,57,1)" iconSize="5" roundness="50%" url="https://github.com/Zinbo" size="32" />

  </div>
)

export default About
