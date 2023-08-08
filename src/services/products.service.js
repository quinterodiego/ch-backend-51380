import { Product } from "./../dao/factory.js";
const productDAO = new Product()

class ProductService {

  create = async (product) => {
    console.log(product)
    const resp = await productDAO.create(product)
    return resp
  }

  getAll = async (limit, page, sort, category, stock) => {

    const filters = {
      page: page || 1,
      limit: limit || 10,
      sort: sort || ''
    }

    let query = {}
    category ? query.category = category : null
    stock ? query.stock = { $gt: stock} : null
    const resp = await productDAO.getAll( query, filters)
    
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
          _id: item._id, 
          title: item.title,
          description: item.description,
          category: item.category,
          thumbnail: item.thumbnail[0],
          price: item.price,
          code: item.code,
          stock: item.stock,
          status: item.status
      };
    });
    const { docs, ...rest } = resp;

    return { 
        status: 'success', 
        payload, 
        pagination: rest 
      }
  }

  getById = async (id) => {
    const resp = await productDAO.getById(id)
    return resp
  }

  update = async (id, updates) => {
    const resp = await productDAO.update(id, updates);

    return resp
  }

  delete = async (id) => {
    const resp = await productDAO.delete(id)

    return resp
  }

}

export const productService = new ProductService()