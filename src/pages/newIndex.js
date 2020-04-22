import React from 'react';
import MainLayout from '../newLayout/index';
import PostListing from '../components/new/PostListing';

const Index = ({ data }) => {
  return (
    <MainLayout>
      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </MainLayout>
  );
};

export default Index;


/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery2 {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            categories
          }
        }
      }
    }
  }
`

