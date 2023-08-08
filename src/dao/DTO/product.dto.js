export default class ProductDTO {
    constructor(product) {
        this.title = product.title 
        this.description = product.description
        this.thumbnail = product.thumbnail
        this.price = product.price
        this.code = product.code
        this.stock = product.stock
        this.category = product.category
        this.status = product.status
        this.brand = product.brand
    }
}