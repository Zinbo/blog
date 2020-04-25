import React from 'react';
import styles from './Footer.module.scss';
import config from '../../data/SiteConfig'; 

const Footer = () => (
  <div className={styles.navbar}>
    <div className={styles.navitem}>
      <a
        href={config.siteUrl + config.siteRss}
        target="_blank"
        rel="noopener noreferrer"
      >
      RSS
      </a>
    </div>
    
    <div className={styles.copyright}>Copyright © 2020. All rights reserved.</div>
  </div>
);

export default Footer;
