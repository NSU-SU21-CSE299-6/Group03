import React, { Fragment, useState, useEffect } from 'react'
import {useAlert} from 'react-alert'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
import { Carousel } from 'react-bootstrap'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const ProductDetails = ({ match}) => {
   
        const [quantity, setQuantity] = useState(1)
        const [rating, setRating] =useState(0);
        const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const alert = useAlert();

    useEffect(() => {
      dispatch(getProductDetails(match.params.id))

      if(error){
          alert.error(error);
          dispatch(clearErrors())
      }

      if(reviewError){
          alert.error(reviewError);
          dispatch(clearErrors())
      }

      if(success) {
          alert.success('Review Posted Successfully');
          dispatch({ type: NEW_REVIEW_RESET })

      }

    }, [dispatch, alert, error, reviewError, match.params.id, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item Added to Cart')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber +1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)   
    }

    
    

    function star_one() {

        const st_one = document.querySelector('.st_one');
        const st_two = document.querySelector('.st_two');
        const st_three = document.querySelector('.st_three');
        const st_four = document.querySelector('.st_four');
        const st_five = document.querySelector('.st_five');

        if(index == 0){
            st_one.classList.add('orange');
            index=1;
        }else{           
            st_two.classList.remove('orange')         
            st_three.classList.remove('orange')         
            st_four.classList.remove('orange')         
            st_five.classList.remove('orange')         
            if(index==1){
                st_one.classList.remove('orange')
                index = 0;
            }else{
                index=1;
            }
        }

        setRating(index)

    }

    function star_two() {

        const st_one = document.querySelector('.st_one');
        const st_two = document.querySelector('.st_two');
        const st_three = document.querySelector('.st_three');
        const st_four = document.querySelector('.st_four');
        const st_five = document.querySelector('.st_five');
        

        if(index == 0 || index == 1){
            st_one.classList.add('orange');
            st_two.classList.add('orange');
            index=2;
        }else{
            st_three.classList.remove('orange')
            st_four.classList.remove('orange')
            st_five.classList.remove('orange')
            if(index==2){
                st_two.classList.remove('orange');
                index=1;
            }else{
                index=2;
            }
        }

        setRating(index)

    }

    function star_three() {

        const st_one = document.querySelector('.st_one');
        const st_two = document.querySelector('.st_two');
        const st_three = document.querySelector('.st_three');
        const st_four = document.querySelector('.st_four');
        const st_five = document.querySelector('.st_five');
        

        if(index == 0 || index == 1 || index == 2){
            st_one.classList.add('orange');
            st_two.classList.add('orange');
            st_three.classList.add('orange');
            index=3;
        }else{
            st_four.classList.remove('orange')
            st_five.classList.remove('orange')
            if(index==3){
                st_three.classList.remove('orange');
                index=2;
            }else{
                index=3;
            }
        }

        setRating(index)

    }

    function star_four() {

        const st_one = document.querySelector('.st_one');
        const st_two = document.querySelector('.st_two');
        const st_three = document.querySelector('.st_three');
        const st_four = document.querySelector('.st_four');
        const st_five = document.querySelector('.st_five');
        

        if(index == 0 || index == 1 || index == 2 || index==3){
            st_one.classList.add('orange');
            st_two.classList.add('orange');
            st_three.classList.add('orange');
            st_four.classList.add('orange');
            index=4;
        }else{
            st_five.classList.remove('orange')
            if(index==4){
                st_four.classList.remove('orange');
                index=3;
            }else{
                index=4;
            }
        }

        setRating(index)

    }

    function star_five() {

        const st_one = document.querySelector('.st_one');
        const st_two = document.querySelector('.st_two');
        const st_three = document.querySelector('.st_three');
        const st_four = document.querySelector('.st_four');
        const st_five = document.querySelector('.st_five');
        

        if(index == 0 || index == 1 || index == 2 || index==3 || index == 4){
            st_one.classList.add('orange');
            st_two.classList.add('orange');
            st_three.classList.add('orange');
            st_four.classList.add('orange');
            st_five.classList.add('orange');
            index=5;
        }else{
            st_five.classList.remove('orange')
            index=4;
        }

        setRating(index)

    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }

    let index = 0;
    let product_rating = (product.ratings/ 5) * 100
    let productRatings = product_rating + "%"
    let productPrice = product.price
   
    return (
           
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: productRatings }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">Price: {product.price} TK</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form control count d-inline"
                                 value={quantity} readOnly />
                                 <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                           </div>
                           &nbsp;
                           <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart} style={{backgroundColor: "#1c8d1c", color: "white"}}>Add to Cart</button>
                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />

                            {user ? <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star st_one" onClick={star_one}><i className="fa fa-star"></i></li>
                                                        <li className="star st_two" onClick={star_two}><i className="fa fa-star"></i></li>
                                                        <li className="star st_three" onClick={star_three}><i className="fa fa-star"></i></li>
                                                        <li className="star st_four" onClick={star_four}><i className="fa fa-star"></i></li>
                                                        <li className="star st_five" onClick={star_five}><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}                                   
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4" onClick={reviewHandler} style={{backgroundColor: "#1c8d1c", color: "white"}}>Submit</button>
                                                </div>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }

                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}

                </Fragment>
            )}
        </Fragment>
       
    )
}

export default ProductDetails
