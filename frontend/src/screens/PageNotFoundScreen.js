import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Button } from 'react-bootstrap'

const PageNotFoundScreen = () => (
  <div>
    <Row className='justify-content-md-center mt-5'>
      <h1>404 Page Not Found</h1>
      <h2>Sorry but we could not find the page you're looking for</h2>

      <h2><Link className='btn-block mt-5' to='/'>Back to homepage</Link></h2>
    </Row>
  </div >
)

export default PageNotFoundScreen
