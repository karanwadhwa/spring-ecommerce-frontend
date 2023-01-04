import React from "react";

const AddressCard = ({
  address,
  showButton,
  onButtonClick,
  buttonText,
  disableButton,
}) => {
  return (
    <div className="card mb-4" style={{ height: "90%" }}>
      <div
        className="card-body d-flex justify-content-between"
        style={{ flexDirection: "column" }}
      >
        <p className="card-text">
          {address.apt}, {address.street}, {address.city}, {address.country} -{" "}
          {address.pin}
        </p>
        {showButton && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onButtonClick}
            disabled={disableButton}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
