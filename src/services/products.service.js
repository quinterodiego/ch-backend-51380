import { ProductModel } from "../DAO/models/product.js";

export const getAll = async (params) => {
  const { limit, page, query, sort } = params

  const filters = {
    page: page || 1,
    limit: limit || 10,
    sort: sort || ''
  }

  const querySearch = query ? { category: query } : ''

  const resp = await ProductModel.paginate( querySearch, filters)

  const paramLimit = limit ? `&limit=${limit}` : ''
  const paramSort = sort ? `&sort=${sort}` : ''
  const paramQuery = query ? `$query=${query}` : ''

  const prevParams = new URLSearchParams(`${paramLimit}&page=${resp.prevPage}${paramSort}${paramQuery}`)
  const nextParams = new URLSearchParams(`${paramLimit}&page=${resp.nextPage}${paramSort}${paramQuery}`)

  resp.prevLink = resp.prevPage ? `?${prevParams}` : null
  resp.nextLink = resp.nextPage ? `?${nextParams}` : null

  const payload = resp.docs.map((item) => {
    return { 
        title: item.title,
        description: item.description,
        category: item.category,
        thumnail: item.thumbnail[0],
        price: item.price,
        code: item.code,
        stock: item.stock
    };
  });
  const { docs, ...rest } = resp;

  let links = [];
  for (let i = 1; i < rest.totalPages + 1; i++) {
    let currentPage = ''
    if (i == rest.page) {
      currentPage = 'h6 text-white text-decoration-none'
    } else {
      currentPage = 'text-info text-decoration-none'
    }
    links.push({ label: i, href: 'http://localhost:3000/products/?page=' + i, currentPage });
  }

  return { 
      status: 'success', 
      payload, 
      pagination: rest, 
      links 
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
