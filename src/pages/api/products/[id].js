import { getDbConnection } from '@/data/db-connection';

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [Products] ${id}`);

  const dbConnection = await getDbConnection();

  switch(req.method) {
  case 'GET':
    var results = await dbConnection.execute(`
      SELECT *
      FROM products
      WHERE id = ${id}
    `);

    var product = results[0][0];

    console.log(product);
    res.status(200).json(product);
    break;

  case 'PUT':
    var product = req.body;
    console.log(product);

    var sql = `
      UPDATE products
      SET name = ?,
          category = ?,
          price = ?,
          weight = ?
      WHERE id = ?
    `;
    var values = [product.name, product.category, product.price, product.weight, id];

    await dbConnection.execute(sql, values);

    res.status(200).json(product);
    break;

  case 'DELETE':
    var sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);

    res.status(200).json({ msg: 'Deleted successfully' });
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
