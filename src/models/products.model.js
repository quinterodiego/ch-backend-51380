import { ProductMongoDBModel } from "../DAO/models/product.js";

class ProductModel {

    getAll = async (query, filters) => {
        const resp = ProductMongoDBModel.paginate( query, filters)
        return resp
    }

    getById = async (id) => {
        const product = await ProductMongoDBModel.findOne({_id: id})
        return product
    }

    create = async (product) => {
        const resp = await ProductMongoDBModel.create(product)
        return resp
    }
}

export const productModel = new ProductModel()