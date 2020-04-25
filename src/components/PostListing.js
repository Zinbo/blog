import React from "react";
import { Link } from 'gatsby';
import styles from "./PostListing.module.scss";
import PostTags from "./PostTags";

const Index = ({ postEdges, pageContext }) => {
  const getPostList = () => {
    const postList = [];
    postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        categories: postEdge.node.frontmatter.categories,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      });
    });
    return postList;
  };

  const postList = getPostList();

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/${(currentPage - 1).toString()}`
  const nextPage = `/${(currentPage + 1).toString()}`



  return (
    <div className={styles.postsBody}>
      <div className={styles.posts}>
        {postList.map((post) => (
          <Link to={post.path} key={post.title}>
            <div className={styles.post}>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postSubHeading}>
                <div className={styles.postDate}>{post.date}</div>
                <div className={styles.postTime}>{post.timeToRead} min read</div>
              </div>
              <div className={styles.postDescription}>
                {post.excerpt}
              </div>
              <PostTags tags={post.tags} />
            </div>
          </Link>
        ))} 
      </div>
      <div>
        <ul className={styles.pagination}>
          {!isFirst && (
            <li className={styles.prevPage}>
              <Link to={prevPage} rel="prev">
          ← Previous Page
              </Link>
        
            </li>
        )}
          {!isLast && (
          <li className={styles.nextPage}>
            <Link to={nextPage} rel="next">
          Next Page →
            </Link>
          </li>
        )}
        </ul>
      </div>
    </div>
  );
};

export default Index;
