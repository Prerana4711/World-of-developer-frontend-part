import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import base_url from "./config";
import { addUser } from "./userSlice";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photourl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setPhotoUrl(user.photourl || "");
      setBio(user.bio || "");
    }
  }, [user]);
  const validateForm = () => {
    if (!firstName.trim()) {
      setError("First Name is required");
      return false;
    }
     if (firstName.length<3) {
      setError("Atleast 3 chararcter requiree");
      return false;
    }
     if (firstName.length>50) {
      setError("Atmost 50 chararcter allowed");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last Name is required");
      return false;
    }
      if (lastName.length<3) {
      setError("Atleast 3 chararcter requiree");
      return false;
    }
     if (lastName.length>50) {
      setError("Atmost 50 chararcter allowed");
      return false;
    }
    if (age && (isNaN(age) || Number(age) < 1 || Number(age) > 120)) {
      setError("Please enter a valid age (1-120)");
      return false;
    }
    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
      setError("Gender must be Male, Female or Other");
      return false;
    }
    setError("");
    return true;
  };
  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      const data = await axios.patch(
        base_url + "/profile/edit",
        {
         first_name: firstName,
         last_name: lastName,
          age,
          gender,
          photourl,
          bio,
        },
        { withCredentials: true },
      );
      dispatch(addUser(data?.data))
      toast.success("Profile updated successfully!");
      navigate('/')
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };

  if (!user) {
    return <div className="flex justify-center mt-10">Loading Profile...</div>;
  }
  if (!user) return;
  return (
    <div className="flex justify-center gap-8">
      <Toaster position="top-center" richColors closeButton />
      <div className="mt-8 ">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          
          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="input"
            placeholder="Update your first name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="input"
            placeholder="Update your last name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="text"
            value={age}
            className="input"
            placeholder="Update your age"
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <input
            type="text"
            value={gender}
            className="input"
            placeholder="Update you gender"
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">Profile</label>
          <input
            type="text"
            value={photourl}
            className="input"
            placeholder="Update your profile pic"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <label className="label">Bio</label>
          <input
            type="text"
            value={bio}
            className="input"
            placeholder="Update your bio"
            onChange={(e) => setBio(e.target.value)}
          />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            className="btn btn-neutral mt-4"
            onClick={() => handleUpdate()}
          >
            Save
          </button>
        </fieldset>
      </div>
      
      <UserCard 
      flag={true}
        data={{
          first_name: firstName,
          last_name: lastName,
          age: age,
          gender: gender,
          photourl: photourl,
          bio: bio,
        }}
      />
    </div>
  );
};

export default Profile;
