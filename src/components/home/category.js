import React from "react"
import { Link } from "gatsby"
import Product from '../category/product'
const productsToShow = 3;
    const Category = ({ category }) => (
        <div class="category">
            <h3>
                <Link 
                    key={category.url_path}
                    to={category.url_path}
                    className="product-name"
                >
                    {category.name}
                </Link>
            </h3>
            {category.products.slice(0, productsToShow).map((product) => {               
            if(product !== null) {      
                return (<Product product={product}/>) 
            }
            return null;
        })}
        </div>

    )
export default Category