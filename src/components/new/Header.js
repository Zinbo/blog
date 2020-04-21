import React from 'react';
import { Link } from 'gatsby';
import config from '../../../data/SiteConfig';
import Categories from '../Categories';
import styles from './header.scss';

const Header = () => (
  <div className='navbar'>
    <div className='navitems'>
      <Link to='/newIndex'>Stack to Basics</Link>
    </div>
    <div className='navitems'>
      <Link to='/about'>About</Link>
    </div>
  </div>
);

export default Header;
