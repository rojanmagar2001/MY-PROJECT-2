import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Products</h3>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                  key={p._id}
                >
                  <div
                    className="card m-2"
                    style={{ width: "15rem", height: "23rem" }}
                  >
                    <img
                      src={`/api/v1/product/photo/${p._id}`}
                      className="card-img-top"
                      alt="..."
                      height={"240px"}
                      style={{ objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
