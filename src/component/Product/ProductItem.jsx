
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import './Product.css'

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      <img className="product-img " src={product.thumbnail} alt={product.title} style={{ borderRadius: "7px" , width: "100%", height: "200px", }} />
      <h3 className="product-text text-uppercase" style={{fontSize: "1.06rem"}}>{product.title}</h3>
      <p className="text-c"><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Rating:</strong> {product.rating}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Discount:</strong> {product.discountPercentage}%</p>
      <Button as={Link } className="product-btn"  to={`/view/${product.id}`}>View Details <FaInfoCircle style={{marginLeft: "5px"}}/></Button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default ProductItem;
