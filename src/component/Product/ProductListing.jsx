import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";

import ProductItem from "./ProductItem";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 8}&limit=8`);
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / 8));
        setLoading(false);
      } catch (error) {
        console.log('Error Fetching', error);
      }
    };
    
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  return (
    <div>
      <h2 className="product-title" >Product Listing</h2>
      <div className="product-body">

      {loading ? (
        <p>Loading...</p>
        ) : (
          <div className="row">
          {products.map(product => (
            <div className="col-sm-3" key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
      </div>
      
      <div className="row ">
        <Button className="product-btn col-1" onClick={handlePrevPage} disabled={page === 1}>Previous</Button>
        <span className="col-10 text-center">Page {page} of {totalPages}</span>
        <Button className="product-btn col-1" onClick={handleNextPage} disabled={page === totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default ProductListing;
