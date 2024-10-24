import React from "react";
import FormPropsTextFields from "../../components/Form/Form";
import "./Upload.css";


import CustomizedTables from "../../components/ProductsTabel/ProductsTabel";

function Upload() {
  return (
    <div className="form-page">
      <div className="form-field">
        <h2>Fill the form with the Product details</h2>
        <FormPropsTextFields />
      </div>
      <CustomizedTables />
    </div>
  );
}

export default Upload;
