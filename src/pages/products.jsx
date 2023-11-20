import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products', {
        method: 'GET'
      });

      if (response.ok) {
        const products = await response.json();
        console.log(`Products: ${JSON.stringify(products)}`);
        setProducts(products);
      } else {
        console.error(response);
      }
    };

    fetchProducts();
  }, []);

  // function deleteproduct(prevproducts, id) {
  //   prevproducts.filter((product) => product.id !== id);
  // }

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts((prevproducts) =>
          prevproducts.filter((product) => product.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let product of products) {
    const key = `${product.id}`;

    const row = (
      <tr key={key}>
        <td>{product.id}</td>
        <td>{product.firstName}</td>
        <td>{product.lastName}</td>
        <td>{product.age}</td>
        <td>{product.weight}</td>
        <td>
          <Link href={`/products/${product.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/products/${product.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(product.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">Products</h1>

      <Button variant="primary" href="products/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}

export default Page;