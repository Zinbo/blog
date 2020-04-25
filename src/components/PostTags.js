import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import styles from './PostTags.module.scss';

const PostTags = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags &&
        tags.map((tag) => (
          <Link key={tag} to={`/tags/${_.kebabCase(tag)}`}>
            <div className={styles.tag}>{tag}</div>
          </Link>
        ))}
    </div>
  );
};

export default PostTags;
