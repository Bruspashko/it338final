/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

var path = require('path');
// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(
                `
                    {
                        allMagentoProduct {
                            edges {
                                node {
                                    id
                                    url_key
                                }
                            }
                        }
                        
                        allMagentoCategory {
                            edges {
                                node {
                                    id
                                    magento_id
                                    url_key
                                    url_path
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }

                // Create pages for each product
                result.data.allMagentoProduct.edges.forEach(({node}) => {
                    createPage({
                        path: `/${node.url_key}/`,
                        component: path.resolve(`./src/components/product.jsx`),
                        context: {
                            url_key: node.url_key,
                            product_id: node.id
                        },
                    });
                });
                
                result.data.allMagentoCategory.edges.forEach(({ node }) => {
                    if(node.id !== null) {
                        createPage({
                            path: `/${node.url_path}/`,
                            component: path.resolve(`./src/components/category.jsx`),
                            context: {
                                category_id: node.id,
                                url_key: node.url_key,
                            },
                        });
                        
                        // id is gatsby.js node id. we need to put magento_id there instead
                        const dstCategory = {
                            ...node,
                            id: node.magento_id,
                        };

                        delete dstCategory.magento_id;
                    }
                });
                
            })
        );
    });
};