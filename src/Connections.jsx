import React, { useEffect, useState } from "react";
import base_url from "./config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./connectionSlice";
import userImage from '../public/user2.jpeg'

const Connections = () => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const connections = useSelector(
    (store) => store.connection
  );

  const getConnections = async () => {
    try {

      if(connections && connections.length > 0){
        setLoading(false);
        return;
      }

      const data = await axios.get(
        base_url + "/user/connection",
        {
          withCredentials: true,
        }
      );

      dispatch(addConnections(data?.data));

    } catch (err) {
      console.log(err.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const handleImageError = (e) => {
    e.target.src = userImage;
  };

  if (loading) {
    return (
      <h1 className='flex justify-center my-12'>
        Loading connections....
      </h1>
    );
  }

  if (connections.length === 0) {
    return (
      <h1 className='flex justify-center my-12'>
        No new Connection found
      </h1>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-7 gap-7">

      {connections.map((item, index) => {

        return (
          <div
            key={index}
            className="card bg-base-300 w-96 rounded-2xl shadow-sm"
          >

            {item?.photourl && (
              <figure className="px-10 pt-10">
                <img
                  src={item?.photourl || userImage}
                  onError={handleImageError}
                  alt="user"
                  className="rounded-2xl"
                />
              </figure>
            )}

            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {`${item?.first_name} ${item?.last_name}`}
              </h2>

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