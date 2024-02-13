import Profile from "../Profile/Profile"
import logo from '../../../public/logo.png'
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import './Home.css'


const Home = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
    <img className="d-block mx-auto mb-4" src={logo} alt="" style={{ width : "25%" , height : "25%"}}/>
    {/* <h1 className="display-5 fw-bold">Project Product</h1> */}
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">The MERN stack is a popular technology stack used for building full-stack web applications. It comprises four main technologies: MongoDB, Express.js, React.js, and Node.js. In this article, we'll explore the steps involved in building a basic full-stack application using the MERN stack.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button as={Link} type="button" to="/product" className="home-btn btn-lg px-4 gap-3">Products</Button>
     
      </div>
    </div>
  </div>
  <div className="my-3">

    <Profile />
  </div>
    
    </>
    
  )
}

export default Home