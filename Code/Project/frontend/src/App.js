import { BrowserRouter as Router, Route } from 'react-router-dom'

 
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
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
