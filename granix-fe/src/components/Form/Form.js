import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import "./Form.css";

export default function FormPropsTextFields() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false); // New state for showing the card

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("number", number);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setIsUploaded(true); // Update state to show the success card
        console.log("Product uploaded successfully:", response.data);

        // Optionally reset the form fields here if needed
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setNumber(1);
        setAvatar(null);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="form">
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "20ch" } }}
        noValidate
        autoComplete="off"
        id="form-main"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <TextField
            required
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            id="text"
          />
          <TextField
            required
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="filled"
            id="text"
          />
          <TextField
            required
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            id="text"
          />

          {/* Dropdown for Category */}
          <FormControl variant="filled" sx={{ m: 1, width: "20ch" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              id="text"
            >
              <MenuItem value={"bed"}>Bed</MenuItem>
              <MenuItem value={"lshape"}>Lshape</MenuItem>
              <MenuItem value={"sofa"}>Sofa</MenuItem>
              <MenuItem value={"chairs"}>Chair</MenuItem>
              <MenuItem value={"nature"}>Nature</MenuItem>
              <MenuItem value={"coffee-table"}>Coffee Table</MenuItem>
              <MenuItem value={"accessories"}>Accessories</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            label="Number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            variant="filled"
            id="text"
          />
          <div className="mb-1">
            Image <span className="font-css top">*</span>
            <div className="">
              <input
                type="file"
                id="file-input"
                name="image"
                onChange={handleFileChange}
                className="file-upload"
                required
              />
            </div>
          </div>
        </div>
        <Button type="submit" variant="outlined" id="upload-button">
          Upload
        </Button>
      </Box>

      {/* Show the success card after product upload */}
      {isUploaded && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Your product was successfully uploaded.
        </Alert>
      )}
    </div>
  );
}
