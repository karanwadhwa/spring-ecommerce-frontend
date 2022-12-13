import React from "react";

const AddressCard = ({
  address,
  showButton,
  onButtonClick,
  buttonText,
  disableButton,
}) => {
  return (
    <div class="card">
      <div class="card-body">
        <p class="card-text">
          {address.apt}, {address.street}, {address.city}, {address.country} -{" "}
          {address.pin}
        </p>
        {showButton && (
          <button
            type="button"
            class="btn btn-primary"
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
