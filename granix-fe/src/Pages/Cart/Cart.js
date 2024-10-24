import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { clear, deleteFromCart } from "../../rtk/slices/cart-slice";

const TAX_RATE = 0.14;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items
    .map(({ price, qty }) => price * qty)
    .reduce((sum, i) => sum + i, 0);
}

// Group identical products and count their quantity
function groupCartItems(carts) {
  const groupedItems = carts.reduce((acc, cart) => {
    const existingItem = acc.find((item) => item.title === cart.title);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      acc.push({ ...cart, qty: 1 });
    }
    return acc;
  }, []);
  return groupedItems;
}

export default function Cart() {
  const carts = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // Group the carts and calculate quantity for each product
  const groupedCarts = groupCartItems(carts);
  const invoiceSubtotal = subtotal(groupedCarts);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div className="cart-main">
      {/* Conditionally render the Clear Cart button only if there are items in the cart */}
      {groupedCarts.length > 0 && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(clear())}
          className="clear-cart"
        >
          Clear Cart
        </Button>
      )}

      {/* Conditionally render the table or a message if the cart is empty */}
      {groupedCarts.length === 0 ? (
        <p className="empty-cart-message">No products in the cart.</p>
      ) : (
        <TableContainer component={Paper} id="cart-tabel">
          <Table sx={{ minWidth: 200 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell id="cart-cell">Id</TableCell>
                <TableCell id="cart-cell" align="right">
                  Title
                </TableCell>
                <TableCell id="cart-cell" align="right">
                  Description
                </TableCell>
                <TableCell id="cart-cell" align="right">
                  Price
                </TableCell>
                <TableCell id="cart-cell" align="right">
                  Quantity
                </TableCell>
                <TableCell id="cart-cell" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedCarts.map((cart, index) => (
                <TableRow key={cart.title}>
                  <TableCell id="cart-cell" align="left">
                    {index + 1}
                  </TableCell>
                  <TableCell id="cart-cell" align="right">
                    {cart.title}
                  </TableCell>
                  <TableCell id="cart-cell" align="right">
                    {cart.description}
                  </TableCell>
                  <TableCell id="cart-cell" align="right">
                    {ccyFormat(cart.price)}
                  </TableCell>
                  <TableCell id="cart-cell" align="right">
                    {cart.qty}
                  </TableCell>
                  <TableCell id="cart-cell" align="right">
                    <Stack>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(deleteFromCart(cart))}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell id="cart-cell" colSpan={3}>
                  Subtotal
                </TableCell>
                <TableCell id="cart-cell" align="right">
                  {ccyFormat(invoiceSubtotal)} EGP{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell id="cart-cell">Tax</TableCell>
                <TableCell
                  id="cart-cell"
                  align="right"
                  colSpan={2}
                >{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell id="cart-cell" align="right">
                  {ccyFormat(invoiceTaxes)} EGP{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell id="cart-cell" colSpan={3}>
                  Total
                </TableCell>
                <TableCell id="cart-cell" align="right">
                  {ccyFormat(invoiceTotal)} EGP{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
