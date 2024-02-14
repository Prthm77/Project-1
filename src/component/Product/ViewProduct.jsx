import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import Button from 'react-bootstrap/Button';
import "./Product.css";

const ViewProduct = () => {
  const { id } = useParams();
  // const navigateTo = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const currentPage = sessionStorage.getItem('currentPage');

  useEffect(() => {
    console.log("id", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // const goBack = () => {
  //   if (currentPage) {
  //     navigateTo(`/products?page=${currentPage}`); // Go back to the previous page with the same page number
  //   } else {
  //     navigateTo(-1); // Go back to the previous page if the current page is not available
  //   }
  // };

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Product:", product);

  return (
    <>
      <h1 className="product-title">Product Details</h1>
      <div className="product-detail d-flex justify-content-center align-items-center">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="product-detail-card">
            <div className="product-img-container">
              <img
                className="product-img"
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "300px" }}
              />
            </div>
            <div className="product-info ml-3">
              <h3 className="product-sub fw-bold text-uppercase">
                {product.title}
              </h3>

              <p className="product-text"> {product.brand}</p>
              <p> {product.description}</p>
              <div className="rating"></div>
              <p className="product-text">
                <span className="highlight">${product.price}</span>
              </p>
              <p>
                Discount:{" "}
                <span className="highlight">{product.discountPercentage}%</span>
              </p>
              <p className="product-text fs-6 fw-bold">
                {" "}
                {product.stock} left in stock
              </p>
              <p>
                Rating:
                {[...Array(Math.round(product.rating))].map((_, index) => (
                  <span key={index} className="star">
                    &#9733;
                  </span>
                ))}
              </p>
              {/* <Button className="product-btn" onClick={goBack}>Go Back</Button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
