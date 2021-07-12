import React from 'react'

const Home = () => {
    return (
        <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
        <section id="products" class="container mt-5">
         <div className="row">
             <div className="col-sm-12 col-md-6 col-lg-3 my-3">
               <div className="indoor_plant p-3 rounded">
                  <img 
                  id="indoor_plant"
                  className="card-img-top mx-auto"
                  src="images/indoor_money_plant.jpg"
                />
                <div className="card-body d-flex flex-column">
                 <h5 className="card-title">
                     <a href="">Indoor_money_plant</a>
                 </h5>
                 <div className="ratings mt-auto">
                     <div className="rating-outer">
                         <div className="rating-inner"></div>
                     </div>
                   <span id="no-of-reviews">(Reviews)</span>
                 </div>
                    <p className="indoor_plant-text">(price)</p>
                    <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                </div>
               </div>
             </div>

         </div>
        </section>
        
        </div>
    )
}

export default Home
