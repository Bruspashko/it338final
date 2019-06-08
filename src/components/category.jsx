import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import Product from "./category/product"

export default ({ data }) => {
  const category = data.magentoCategory
  return (
  <Layout>
    <SEO title={category.name} />
      <div class="category-page category">
        <h1>
            <span class="title">{category.name}</span>
        </h1>
        {category.products.map((product) => {               
          if(product !== null) {      
            return (<Product product={product}/>) 
          }
          return null;
        })}
      </div>
    <div style={{clear:'both'}}></div>
  </Layout> 
  )
}

export const query = graphql`
  query($category_id: String!) {
    magentoCategory(id: {eq: $category_id}) {
      name
      products {
        name
        price {
          regularPrice {
            amount {
              currency
              value
            }
          }
        }
        sku
        url_key
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
`
