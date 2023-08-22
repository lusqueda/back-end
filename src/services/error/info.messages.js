export const generateErrorInfo = (product) => {
    return `One or more properties were completed or invalid
    List of required properties:
    *title: need to be a String, received  ${product.title}
    *description: need to be a String, received  ${product.description}
    *category: need to be a String, received  ${product.category}
    *price: need to be a String, received  ${product.price}    
    *stock: need to be a Number, received  ${product.stock}`
}