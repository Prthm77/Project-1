import { useState, useEffect } from "react";
import axios from "axios";


import ProductItem from "./ProductItem";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?skip=${(page - 1) * 8}&limit=8`
        );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / 8));
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching", error);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h1 className="product-title">Products</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>

      <div className="product-body" style={{ marginLeft: "9px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-xxl-3" key={product.id}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

    
    <div className="mt-3">
  <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      <li className="page-item ">
        <a
          className="page-link page-btn"
          onClick={handlePrevPage}
          disabled={page === 1 ? 'true' : ''}
          style={{ marginRight: "10px" }} 
        >
          Previous
        </a>
      </li>
      <li className="page-item">
        <span className="col-10 text-center">
          Page {page} of {totalPages}
        </span>
      </li>
      <li className="page-item">
        <a
          className="page-link page-btn"
          onClick={handleNextPage}
          disabled={page === totalPages}
          style={{ marginLeft: "10px" }} 
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</div>

    </div>
  );
};

export default ProductListing;
