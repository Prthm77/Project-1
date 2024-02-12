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
   <h1 className="product-title">View Product</h1>
      <div className="product-detail">
        <h2>Product Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <h3>{product.title}</h3>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Rating: {product.rating}</p>
            <p>Price: {product.price}</p>
            <p>Discount: {product.discount}%</p>
            <p>Description: {product.description}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </>
  )
}

export default ViewProduct