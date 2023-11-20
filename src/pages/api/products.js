import { getDbConnection } from '@/data/db-connection';

async function handler(req, res) {
  console.log(`[${req.method}] [Products]`);

  const dbConnection = await getDbConnection();

  switch(req.method) {
  case 'GET':
    var results = await dbConnection.execute(`
      SELECT *
      FROM products
    `);

    const products = results[0];

    console.log(products);
    res.status(200).json(products);
    break;

  case 'POST':
    console.log(req.body);

    const product = req.body;

    var sql = `
      INSERT INTO products (name, category, price, weight)
      VALUES (?, ?, ?, ?)
    `;
    var values = [product.name, product.category, product.price, product.weight];

    await dbConnection.execute(sql, values);

    res.status(200).json(product);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
