import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../../store/actions/UserActions";

const AddNewAddress = (isEditing = false, address) => {
  const [showForm, setShowForm] = useState(false);
  const [street, setStreet] = useState(address.street ?? "");
  const [apt, setApt] = useState(address.apt ?? "");
  const [city, setCity] = useState(address.city ?? "");
  const [country, setCountry] = useState(address.country ?? "");
  const [pin, setPin] = useState(address.pin);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="mt-2 mb-3">
      <form className="col-6">
        {showForm && (
          <div>
            <div className="row">
              <div className="col-auto">
                <label className="form-label" htmlFor="apt">
                  Apt
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={apt}
                  onChange={(e) => setApt(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="street">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label className="form-label" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="pin">
                  Pin Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-outline-primary mt-2"
          onClick={(e) => {
            e.preventDefault();
            if (showForm)
              dispatch(
                saveAddress(user.userid, { street, city, apt, country, pin })
              );
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Save Address" : "New Address"}
        </button>
      </form>
    </div>
  );
};

export default AddNewAddress;
