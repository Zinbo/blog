import React from 'react';
import styles from './newIndex.scss';
import Header from '../components/new/Header';
import MainLayout from '../newLayout/index';
import PostListing from '../components/new/PostListing';

const Index = () => {
  return (
    <MainLayout>
      <PostListing />
    </MainLayout>
  );
};

export default Index;
