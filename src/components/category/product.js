import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"
import CurrencyFormat from 'react-currency-format';


const Product = ({ product }) => (
    <div class="product">
      <div>
      <Link 
        key={product.url_key}
        to={product.url_key}
        className="product-name"
      >
        <Image fluid={product.image.childImageSharp.fluid} object/>
      </Link>
      </div>
      <div class="title">
        <Link 
          key={product.url_key}
          to={product.url_key}
          className="product-name"
        >
          {product.name}
        </Link>
        <span class="price">
          <CurrencyFormat value={product.price.regularPrice.amount.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </span>
      </div>
    </div>
  )
  
export default Product
