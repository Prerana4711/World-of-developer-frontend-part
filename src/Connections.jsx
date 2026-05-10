import React from "react";
import base_url from "./config";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./connectionSlice";
import userImage from '../public/user2.jpeg'
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((connection) => connection.connection);
  const getConnections = async () => {
    try {
      const data = await axios.get(base_url + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if(connections.length==0)  return <h1 className='flex justify-center my-12'>No new Connection found</h1>
   const handleImageError = (e) => {
      e.target.src = userImage;   
    };
  return (
    <div className="flex flex-col justify-center items-center mt-7 gap-7">
      {connections &&
        connections.length > 0 &&
        connections.map((item, index) => {
          return (
            <div key={index} className="card bg-base-300 w-96 rounded-2xl shadow-sm">
             {item?.photourl && <figure className="px-10 pt-10">
                <img
                  src={
                    item?.photourl || userImage
                  }
                  onError={handleImageError}
                  alt="user"
                  className="rounded-2xl"
                />
              </figure>}
              <div className="card-body items-center text-center">
                <h2 className="card-title">{`${item?.first_name} ${item?.last_name}`}</h2>
                <p>{item?.bio}</p>
                <div className="card-actions"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Connections;