import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import PageNotFoundScreen from './screens/PageNotFoundScreen'
import UsersScreen from './screens/UsersScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductsScreen from './screens/ProductsScreen'
import CreateProductScreen from './screens/CreateProductScreen'
import EditProductScreen from './screens/EditProductScreen'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />

        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/admin/users' component={UsersScreen} />
              <Route path='/admin/products' component={ProductsScreen} />
              <Route path='/admin/user/:id' component={EditUserScreen} />
              <Route path='/admin/product/create' component={CreateProductScreen} />
              <Route path='/admin/product/:id/edit' component={EditProductScreen} />
              <Route path='/signin' component={SignInScreen} />
              <Route path='/signup' component={SignUpScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentMethodScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route component={PageNotFoundScreen} />
            </Switch>
          </Container>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
