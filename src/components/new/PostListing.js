import React from 'react';
import styles from './PostListing.module.scss';
import PostTags from './PostTags';

const Index = () => {
  return (
    <div className={styles.postsBody}>
      <div className={styles.posts}>
        <div className={styles.post}>
          <div className={styles.postTitle}>This is my First Blog Post</div>
          <div className={styles.postSubHeading}>
            <div className={styles.postDate}>2020-01-01</div>
            <div className={styles.postTime}>10 mins</div>
          </div>
          <div className={styles.postDescription}>
            This is the start of the article. It will have some information on
            what the article entails. blah blah blah...
          </div>
          <PostTags tags={['Java', 'Spring']} />
        </div>

        <div className={styles.post}>
          <div className={styles.postTitle}>This is my Second Blog Post</div>
          <div className={styles.postSubHeading}>
            <div className={styles.postDate}>2020-01-01</div>
            <div className={styles.postTime}>10 mins</div>
          </div>
          <div className={styles.postDescription}>
            This is the start of the article. It will have some information on
            what the article entails. blah blah blah...
          </div>
          <PostTags tags={['React', 'Gatsby']} />
        </div>
      </div>
    </div>
  );
};

export default Index;
