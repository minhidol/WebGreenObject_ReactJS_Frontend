import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

import {DataProvider} from './contextAPI/dataContext'

import Navbar from './components/header'
import Footer from './components/footer'
import DetailProduct from './pages/detail_product'
import _Cart from './pages/cartProduct'
import Payment from './pages/payment'
import Admin from './pages/admin'
import ManageProduct from './pages/manage_product'
import ManageBill from './pages/manage_bill'
import DetailBill from './pages/bill_detail'
import SearchItems from './pages/search-items';
import SectionProducts from './pages/section-products';


class App extends Component {
  constructor(props){
    super(props);    
  }

  componentDidMount(){
    console.log("app DId mount");
  }
  
  render() {
    
    return(
      
      <DataProvider>
        <Router>
            <div className='App'>
              <Navbar/>
              <Switch>
                <Route path='/' exact component={Home} exact/>
                <Route path='/results' exact>
                  <SearchItems/>
                </Route>
                <Route path='/category/:section' exact component={SectionProducts}/>
                <Route path='/register' exact>
                  <Register/>
                </Route>
                <Route path='/login' exact component={Login} exact/>
                <Route path='/cart' exact component={_Cart} exact/>
                <Route path='/payment' exact>
                  <Payment/>
                </Route>

                <Route path='/admin' exact component={Admin} exact/>
                <Route path='/manage_product' exact component={ManageProduct} exact/>
                <Route path='/manage_bill' exact component={ManageBill} exact/>

                <Route path='/:id' exact component={DetailProduct} exact/>
                <Route path='/bill/:id' exact component={DetailBill} exact/>
                </Switch> 
              <Footer/>
            </div>
        </Router>
      </DataProvider>
  
    )
}
}


export default App;
