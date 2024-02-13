import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import  axios  from "axios"
import './Product.css'


const ViewProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

useEffect(() =>{
  console.log( 'id' , id)
  const fetchData = async () => {
    try{ 
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data)
      setLoading(false)
    }
    catch (error) {
      console.log('Error Fetching', error);
      setError(error);
      setLoading(false);
    }
    


  }
  fetchData();
} , [id]);

console.log("Loading:", loading);
console.log("Error:", error);
console.log("Product:", product);

  return (
    <>
   <h1 className="product-title">View Product Details</h1>
   <div className="product-detail d-flex justify-content-center align-items-center">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="product-detail-card d-flex">
      <div className="product-img-container">
        <img className="product-img" src={product.thumbnail} alt={product.title} style={{borderRadius : "8px", marginRight: "9px"}} />
      </div>
      <div className="product-info ml-3">
        <h3 className="product-text text-uppercase">{product.title}</h3>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <div className="rating">
          {/* Render rating stars based on product.rating */}
          <p>Rating:
          {[...Array(Math.round(product.rating))].map((_, index) => (
    <span key={index} className="star">&#9733;</span>
  ))}
  </p>
        </div>
        <p>Price: <span className="highlight">{product.price}</span></p>
        <p>Stock: {product.stock}</p>
        <p>Discount: <span className="highlight">{product.discountPercentage}%</span></p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  )}
</div>
    </>
  )
}

export default ViewProduct