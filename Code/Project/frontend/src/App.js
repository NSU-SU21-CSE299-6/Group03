import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart'

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";

import Login from './components/user/Login'



function App() {
  return (
    <Router>
    <div className="App">
    <Header/>
    <div className="container container-fluid">
    <Route path = "/" component={Home} exact/>
    <Route path = "/search/:keyword" component={Home} />
    <Route path = "/product/:id" component={ProductDetails} exact/>

    <Route path="/login" component={Login}/>

    <Route path = "/cart" component={Cart} exact/>

    </div>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
