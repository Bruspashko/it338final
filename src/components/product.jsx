import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import Image from "gatsby-image"
import CurrencyFormat from 'react-currency-format';
import { graphql } from "gatsby"

  export default ({ data }) => {
    const product = data.magentoProduct
    return (
    <Layout>

      <SEO title={product.name} />
      <div class="product-page">
        <h1>
            <span class="title">{product.name}</span>
            <span class="price">
              <CurrencyFormat value={product.price.regularPrice.amount.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
        </h1>
        <div class="image">
          <Image fluid={product.image.childImageSharp.fluid} object/>
        </div>
        <p dangerouslySetInnerHTML={{__html: product.description}}></p>
        <div style={{clear:'both'}}></div>
      </div>
    </Layout> 
    )
  }
  
  export const query = graphql`
    query($product_id: String!) {
      magentoProduct(id: {eq: $product_id}) {
        name
        description
        image {
          childImageSharp {
            fluid(maxWidth: 300, quality:100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        price {
          regularPrice {
            amount {
              currency
              value
            }
          }
        }
      }
    }
  `
