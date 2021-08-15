import React from 'react'
import { Link } from 'react-router-dom'



const Product = ({ product, col }) => {

    let product_rating = (product.ratings/ 5) * 100
    let product_ratings = product_rating + "%"
    let productID = product._id;
    let c = col

    return (

        <div className={"col-sm-12 col-md-6 col-lg-c my-3"}>
               <div className="indoor_plant p-3 rounded">
                  <img 
                  id="indoor_plant"
                  className="card-img-top mx-auto"
                  src={product.images[0].url}
                />
                <div className="card-body d-flex flex-column">
                 <h5 className="card-title">
                     <Link to={'/product/' + productID}>{product.name}</Link>
                 </h5>
                 <div className="ratings mt-auto">  
                     <div className="rating-outer">
                         <div className="rating-inner" style={{ width: product_ratings }}></div>
                     </div>
                   <span id="no-of-reviews">({product.numOfReviews}Reviews)</span>
                 </div>
                    <p className="indoor_plant-text">(TK:{ product.price})</p>
                    <Link to={'./product/' + productID} id="view_btn" className="btn btn-block">View Details </Link>
                </div>
               </div>
             </div>
    )
}

export default Product
