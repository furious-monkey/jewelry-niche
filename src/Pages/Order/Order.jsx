import { Rating } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import "./Order.css";

const Order = () => {
  const history = useHistory();
  const [orderSuccess, setOrderSuccess] = useState(false);
  //  import user and useparams id
  const { user } = useAuth();
  const { id } = useParams();

  //   fetch singleProduct from API and set
  const [singleProduct, setSingleProduct] = useState({});
  useEffect(() => {
    fetch(`https://jewelry-niche-server.vercel.app/jewelry/${id}`)
      .then((response) => response.json())
      .then((data) => setSingleProduct(data));
  }, [id]);

  //   Use form hooks function
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //  if user Order is valid then
    if (!data.name) {
      return (
        <Spinner className='mx-auto' animation='border' variant='danger' />
      );
    } else {
      // set singleProduct in data
      data.status = "pending";
      data.product = singleProduct;

      //   fetch the post API
      fetch("https://jewelry-niche-server.vercel.app/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.insertedId) {
            setOrderSuccess(true);
            history.push("/dashboard/myorder");
          }
        });
    }
  };

  // Send Order post to MONGODB
  return (
    <Container className='my-md-5 my-3'>
      <div className='order-form mx-auto' style={{ maxWidth: "600px" }}>
        <h2 className='regular-title mb-md-5 mb-3'>Complete Your Order</h2>

        <Row className='single-product-card g-4 my-4'>
          <Col sm={4} md={4}>
            <img src={singleProduct.image} alt='' className='img-fluid' />
          </Col>
          <Col sm={8} md={8}>
            <h4>{singleProduct.title}</h4>
            <p className='product-price'>${singleProduct.price}</p>
            <p>
              <Rating
                name='read-only'
                value={parseInt(singleProduct.rating)}
                readOnly
              />
            </p>
            <p>
              <i className='fas fa-location-arrow'></i> {singleProduct.vendor}
            </p>
          </Col>
        </Row>

        {orderSuccess ? (
          <Alert severity='success'>Order Added Successfully!</Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='floatingInput'
                value={user.displayName}
                {...register("name")}
                required
              />
              <label htmlFor='floatingInput'>Name</label>
            </div>

            <div className='form-floating mb-3'>
              <input
                type='email'
                value={user.email}
                className='form-control'
                id='floatingInput'
                {...register("email")}
                required
              />
              <label htmlFor='floatingInput'>Email</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                id='floatingInput'
                {...register("phone")}
                required
              />
              <label htmlFor='floatingInput'>Phone Number</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='floatingInput'
                {...register("address")}
                required
              />
              <label htmlFor='floatingInput'>Address</label>
            </div>
            <input
              className='btn btn-success px-3'
              type='submit'
              value='ORDER NOW'
            />
          </form>
        )}
      </div>
    </Container>
  );
};

export default Order;
