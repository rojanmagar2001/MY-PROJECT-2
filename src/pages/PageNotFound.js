import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Not Found"}>
      <div className="pnf">
        <div className="pnf-title">404</div>
        <h2 className="pnf-heading">Page Not Found !</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
