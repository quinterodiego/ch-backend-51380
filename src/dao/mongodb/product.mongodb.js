import { ProductMongoDBModel } from "./models/product.model.js";
import ProductDTO from '../DTO/product.dto.js'

export default class ProductMongoDB {
    // constructor() {}

    create = async (product) => {
        const productDTO = new ProductDTO(product)
        const resp = await ProductMongoDBModel.create(productDTO)
        return resp
    }

    getAll = async (query, filters) => {
        const resp = await ProductMongoDBModel.paginate( query, filters)
        return resp
    }

    getById = async (id) => {
        const product = await ProductMongoDBModel.findOne({_id: id})
        return product
    }

    update = async (id, updates) => {
        const resp = await ProductMongoDBModel.updateOne({ _id: id }, {$set: updates});
        return resp
    }

    delete = async (id) => {
        const resp = await ProductMongoDBModel.deleteOne({ _id: id})
        return resp
    }
}