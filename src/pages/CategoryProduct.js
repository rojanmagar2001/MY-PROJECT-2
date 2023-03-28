import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [category, setCategory] = useState({});

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
    // eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout title={`Category Product`}>
      <div className="container mt-4 mb-3">
        <h3 className="text-center">Category: {category?.name}</h3>
        <h4 className="text-center">No of Products: {products?.length}</h4>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
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
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  Read More
                </button>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
