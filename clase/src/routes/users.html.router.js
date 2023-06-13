import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';

export const usersHtmlRouter = express.Router();

usersHtmlRouter.get('/', async (req, res) => {
  const { limit, page, query, sort } = req.query;
  
  const filters = {
    page: page || 1,
    limit: limit || 10,
    sort: sort || ''
  }

  const querySearch = query ? {
    category: query
  } : ''

  const resp = await UserModel.paginate( querySearch, filters);

  const usuarios = resp.docs.map((item) => {
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
    links.push({ label: i, href: 'http://localhost:3000/products/' + i });
  }
  return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
});
