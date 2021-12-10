import React, { useState } from "react";
import "../CSS/AddItem.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Button,
  FormControl,
} from "react-bootstrap";

function AddItem() {
  //Required variables declaration
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemRating, setItemRating] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const URL = "https://61b040683e2aba0017c4968e.mockapi.io/itemDetails";

  const navigate = useNavigate();

  //User input Validation
  const handleFormValidation = () => {
    let formErrors = {};
    let formValid = true;

    if (!itemName) {
      formValid = false;
      formErrors["itemNameErr"] = "Item Name is required!";
    }

    if (!itemDescription) {
      formValid = false;
      formErrors["itemDescErr"] = "Item Description is required!";
    }

    if (!itemPrice) {
      formValid = false;
      formErrors["itemPriceErr"] = "Item Price is required!";
    } else if (itemPrice < 0) {
      formValid = false;
      formErrors["itemPriceErr"] = "Item Price cannot be less than 0!";
    }

    if (!itemRating) {
      formValid = false;
      formErrors["itemRatingErr"] = "Item Rating is required!";
    } else if (itemPrice < 1 && itemRating > 10) {
      formValid = false;
      formErrors["itemRatingErr"] = "Item Rating should be between 1-10!";
    }

    setFormErrors(formErrors);
    return formValid;
  };

  //If no validation error post the data will be posted to the API
  const postData = (e) => {
    e.preventDefault();
    if (handleFormValidation()) {
      axios
        .post(URL, {
          itemName,
          itemDescription,
          itemPrice,
          itemRating,
        })
        .then((result) => {
          navigate("/listItems");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Extract error fields from formErrors object
  const { itemNameErr, itemDescErr, itemPriceErr, itemRatingErr } = formErrors;

  return (
    <div className=" app flex-col align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <Card.Body className="p-4">
                <Form onSubmit={postData}>
                  <h1 className="item_title">Add Item</h1>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Enter Item name"
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      {...(itemNameErr ? "showError" : "")}
                    />
                    {itemNameErr && (
                      <div className="item_err">{itemNameErr}</div>
                    )}
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      placeholder="Enter Item Description"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      {...(itemDescErr ? "showError" : "")}
                    />
                    {itemDescErr && (
                      <div className="item_err">{itemDescErr}</div>
                    )}
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="number"
                      placeholder="Enter Item Price"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      {...(itemPriceErr ? "showError" : "")}
                    />
                    {itemPriceErr && (
                      <div className="item_err">{itemPriceErr}</div>
                    )}
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="number"
                      placeholder="Enter Item Rating"
                      value={itemRating}
                      onChange={(e) => setItemRating(e.target.value)}
                      {...(itemRatingErr ? "showError" : "")}
                    />
                    {itemRatingErr && (
                      <div className="item_err">{itemRatingErr}</div>
                    )}
                  </InputGroup>
                  <Card.Footer className="p-4">
                    <Row>
                      <Button
                        type="submit"
                        variant="dark"
                        className="btn btn-info mb-1"
                        block
                      >
                        <span>Add</span>
                      </Button>
                    </Row>
                  </Card.Footer>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddItem;
