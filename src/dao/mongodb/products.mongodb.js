import { ProductMongoDBModel } from "./models/products.model.js";

class Products {

    create = async (product) => {
        const resp = await ProductMongoDBModel.create(product)
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

export const products = new Products()