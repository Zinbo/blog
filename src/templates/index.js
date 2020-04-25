import React from 'react';
import MainLayout from '../layout/index';
import PostListing from '../components/PostListing';

const Index = ({ data, pageContext }) => {
  return (
    <MainLayout>
      <PostListing postEdges={data.allMarkdownRemark.edges} pageContext={pageContext} />
    </MainLayout>
  );
};

export default Index;


/* eslint no-undef: "off" */
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
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

