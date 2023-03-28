import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} results`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((p) => (
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
                  <button className="btn btn-primary ms-1">Read More</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
