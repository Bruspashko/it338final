module.exports = {
  siteMetadata: {
    title: `Gatsby Magento2 Catalog Viewer`,
    description: `Simple catalog viewer that grabs data via GraphQl from Magento 2.3 backend`,
    author: `@bruspashko`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Magento2 Catalog Viewer`,
        short_name: `Catalog Viewer`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-magento2",
      options: {
          graphqlEndpoint: "https://magento-venia.now.sh/graphql",
          
          // this is optional
          queries: {
              // see example query in src/nodes/queries/products.js
              allProductsQuery: `query {
                products (
                  filter:{
                    sku: {
                      like:"%"
                    }
                  }
                  pageSize: 1000
                ) {
                  items {
                    id
                    sku
                    name
                    type_id
              
                    description {
                      html
                    }
                    
                    short_description {
                      html
                    }
                    
                    meta_title
                    meta_keyword
                    meta_description
                    
                    image {
                      label
                      url
                    }
              
                    url_key
                    
                    new_to_date
                    new_from_date
                    special_price
                    
                    updated_at
              
                    ... on ConfigurableProduct {
                      configurable_options {
                        attribute_id          
                        attribute_code          
                        label
                        values {
                          label
                          value_index
                        }
                      }
                    }
                    
                    categories {
                      id
                      name
                      url_path
                    }
              
                    price {
                      regularPrice {
                        amount {
                          value
                          currency
                        }
                      }
                    }
                  }
                }
              }`,
              // see example query in src/nodes/queries/categories.js
              categoryQuery: `query fetchCategory($id: Int!){
                category(id: $id) {
                    children {
                        id
                        name
                        description
                        
                        created_at
                        updated_at
                
                        url_key
                        url_path
                        
                        image
                
                        children_count
                        position
                
                        level
                        product_count
                        default_sort_by
                        meta_title
                        meta_keywords
                        meta_description
                        landing_page
                        is_anchor
                        include_in_menu
                        filter_price_range
                        display_mode
                        available_sort_by
                        
                        breadcrumbs {
                            category_id
                            category_name
                            category_level
                            category_url_key
                        }
                        
                        products(pageSize: 10000) {
                            items {
                                id
                            }
                        }
                        
                        path
                        path_in_store
                
                    }
                }
            }`
          }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
