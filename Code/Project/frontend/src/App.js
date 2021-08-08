import { BrowserRouter as Router, Route } from 'react-router-dom'

 import ProductDetails from './components/product/ProductDetails';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";



function App() {
  return (
    <Router>
    <div className="App">
    <Header/>
    <div className="container container-fluid"></div>
    <Route path = "/" component={Home} exact/>
    <Route path = "/search/:keyword" component={Home} />
    <Route path = "/product/:id" component={ProductDetails} exact/>
 
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
