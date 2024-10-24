import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../rtk/slices/products-slice";
import axios from "axios";
import "./ProductsTabel.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#212121",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products); // Access products array

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <TableContainer component={Paper} id="tabelProducts">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Price EGP</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell id="tabel-product" component="th" scope="row">
                  {product.title}
                </StyledTableCell>
                <StyledTableCell id="tabel-product" align="center">
                  {product.description}
                </StyledTableCell>
                <StyledTableCell id="tabel-product" align="center">
                  {product.price.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell id="tabel-product" align="center">
                  {product.quantity}
                </StyledTableCell>
                <StyledTableCell id="tabel-product" align="center">
                  {product.category}
                </StyledTableCell>
                <StyledTableCell id="tabel-product" align="center">
                  <Stack>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                No products available.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
