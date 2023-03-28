import Layout from "../components/layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout title={"Product Details"}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={"400px"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6 mt-4">
            <h3>Product Details</h3>
            <h6>Name: {product.name}</h6>
            <p>Description: {product.description}</p>
            <h6>Price: ${product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            <button
              className="btn btn-secondary ms-1"
              onClick={() => {
                const itemIndex = cart?.findIndex(
                  (item) => item._id === product._id
                );

                if (itemIndex >= 0) {
                  toast.error("Item already added to the Cart");
                } else {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to cart Successfully.");
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr />
        <div className="row container">
          <h3>Similar Products</h3>
          {relatedProducts?.length < 1 ? (
            <p>No Similar Products Found</p>
          ) : (
            relatedProducts?.map((p) => (
              <div className="card m-4" key={p._id} style={{ width: "20rem" }}>
                <img
                  src={`/api/v1/product/photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"240px"}
                  style={{ objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
