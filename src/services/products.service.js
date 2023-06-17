import { ProductModel } from "../DAO/models/product.js";

export const getAll = async (limit, page, sort, category, stock) => {

  const filters = {
    page: page || 1,
    limit: limit || 10,
    sort: sort || ''
  }

  let query = {}
  category ? query.category = category : null
  stock ? query.stock = { $gt: stock} : null
  const resp = await ProductModel.paginate( query, filters)
  
  const paramLimit = limit ? `&limit=${limit}` : ''
  const paramSort = sort ? `&sort=${sort}` : ''
  const paramCategory = category ? `&category=${category}` : ''
  const paramStock = stock ? `&stock=${stock}` : ''

  const prevParams = new URLSearchParams(`${paramLimit}&page=${resp.prevPage}${paramSort}${paramCategory}${paramStock}`)
  const nextParams = new URLSearchParams(`${paramLimit}&page=${resp.nextPage}${paramSort}${paramCategory}${paramStock}`)

  resp.prevLink = resp.prevPage ? `?${prevParams}` : null
  resp.nextLink = resp.nextPage ? `?${nextParams}` : null

  const payload = resp.docs.map((item) => {
    return { 
        title: item.title,
        description: item.description,
        category: item.category,
        thumbnail: item.thumbnail[0],
        price: item.price,
        code: item.code,
        stock: item.stock
    };
  });
  const { docs, ...rest } = resp;

  return { 
      status: 'success', 
      payload, 
      pagination: rest 
    }
}

export const getById = async (id) => {
    const product = await ProductModel.findOne({_id: id})

    return product
}

export const create = async (product) => {
  const resp = await ProductModel.create(product)

  return resp
}

export const update = async (id, updates) => {
  const resp = await ProductModel.updateOne({ _id: id }, {$set: updates});

  return resp
}

export const deleteProduct = async (id) => {
  const resp = await ProductModel.deleteOne({ _id: id})

  return resp
}
