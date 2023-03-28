import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="p-2 text-dark text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call us anytime We are
            available 24/7
          </p>
          <p className="mt-3">
            <BiMailSend /> : rozenmagar058@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9823196300
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-000-000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
