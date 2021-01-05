import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item className='justify-content-center mb-4'>
        {step1 ? <LinkContainer to='/signin'><Nav.Link>Sign in</Nav.Link></LinkContainer> : <Nav.Link disabled>Sign in</Nav.Link>}
      </Nav.Item>

      <Nav.Item className='justify-content-center mb-4'>
        {step2 ? <LinkContainer to='/shipping'><Nav.Link>Shipping</Nav.Link></LinkContainer> : <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>

      <Nav.Item className='justify-content-center mb-4'>
        {step3 ? <LinkContainer to='/payment'><Nav.Link>Payment</Nav.Link></LinkContainer> : <Nav.Link disabled>Payment</Nav.Link>}
      </Nav.Item>

      <Nav.Item className='justify-content-center mb-4'>
        {step4 ? <LinkContainer to='/placeorder'><Nav.Link>Place order</Nav.Link></LinkContainer> : <Nav.Link disabled>Place order</Nav.Link>}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
