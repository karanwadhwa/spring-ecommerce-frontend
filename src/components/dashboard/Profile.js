import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../store/actions/UserActions";
import AddNewAddress from "../common/AddNewAddress";
import AddressCard from "../common/AddressCard";
import NavBar from "../common/NavBar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [fname, setFname] = useState(user.fname);
  const [lname, setlname] = useState(user.lname);
  const [email, setemail] = useState(user.email);
  return (
    <div className="container mb-4">
      <NavBar />
      <div className="h3">Profile</div>
      <form className="col-6">
        <div className="row">
          <div className="col">
            <label className="form-label" htmlFor="fname">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              required
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="lname">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              required
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              // required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dispatch(saveProfile({ ...user, fname, lname, email }));
              setIsEditing(false);
            }}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
        {user.usertype === "customer" && (
          <div className="row mt-3">
            <div className="col">
              <label className="form-label" htmlFor="email">
                Addresses
              </label>
              <div className="row">
                {user.addresses.map((add) => (
                  <div className="col">
                    <AddressCard showButton={false} address={add} />
                  </div>
                ))}
              </div>
              <AddNewAddress />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
