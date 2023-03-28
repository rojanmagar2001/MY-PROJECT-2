import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);

  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/users/${userId}`);
      if (data.success) {
        toast.success("User Deleted Successfully");
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Users</h3>
            <div className="mt-3 border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Answer</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u, i) => (
                    <tr key={u?._id}>
                      <td>{i + 1}</td>
                      <td>{u?.name}</td>
                      <td>{u?.email}</td>
                      <td>{u?.phone}</td>
                      <td>{u?.address}</td>
                      <td>{u?.answer}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
