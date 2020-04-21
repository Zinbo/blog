import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/new/Footer'
import Header from '../components/new/Header'
import config from '../../data/SiteConfig'
import styles from './index.module.scss'

const MainLayout = ({ children }) => (
  <div id="new-index-container">
    <Header />
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    {children}
    <Footer />
  </div>
)

export default MainLayout
