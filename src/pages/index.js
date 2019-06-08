import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Category from "../components/home/category"
export default ({ data }) => {
  const categories = data.allMagentoCategory.nodes;
  return (
  <Layout>
    <SEO title="Home" />
    {categories.map((category) => {               
          return (<Category category={category}/>) 
        })}
  </Layout>
  )
}



export const query = graphql`
query {
  allMagentoCategory(filter: {level: {eq: 2}}) {
    nodes {
      id
      magento_id
      url_key
      url_path
      name
      products {
        name
        url_key
        price {
          regularPrice {
            amount {
              value
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 300, quality:100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`
