import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "./config";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./RequestSlice";
import userImage from '../public/user2.jpeg'

const Request = () => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const requests = useSelector((store) => store.request);

  const getRequest = async () => {

    try {

      if(requests && requests.length > 0){
        setLoading(false);
        return;
      }

      const data = await axios.get(
        base_url + "/user/requests/recieved",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequests(data?.data));

    } catch (err) {

      console.log(err.message);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const requestHandler = async(status, _id) => {

    try {

      await axios.post(
        base_url + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true
        }
      );

      dispatch(removeRequest(_id));

    } catch(err){

      console.log(err.message)
    }
  }

  const handleImageError = (e) => {
    e.target.src = userImage;
  };

  if (loading) {
    return (
      <h1 className='flex justify-center my-12'>
        Loading requests....
      </h1>
    );
  }

  if (requests.length === 0) {
    return (
      <h1 className='flex justify-center my-12'>
        No Request found
      </h1>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-7 gap-7">

      {requests.map((item, index) => {

        return (
          <div
            key={index}
            className="card bg-base-300 w-96 shadow-sm"
          >

            <figure className="p-8">
              <img
                src={item?.fromuserId?.photourl || userImage}
                onError={handleImageError}
                alt="user"
                className="rounded-2xl"
              />
            </figure>

            <div className="card-body items-center text-center">

              <h2 className="card-title">
                {`${item?.fromuserId?.first_name} ${item?.fromuserId?.last_name}`}
              </h2>

              <p>{item?.fromuserId?.bio}</p>

              <div className="card-actions justify-center">

                <button
                  className="btn btn-primary"
                  onClick={() => requestHandler("rejected", item._id)}
                >
                  Reject
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => requestHandler("accepted", item._id)}
                >
                  Accept
                </button>

              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default Request;