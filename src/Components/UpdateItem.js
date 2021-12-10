import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
  Row,
} from "react-bootstrap";

import { useNavigate, useParams } from "react-router";

function UpdateItem() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemRating, setItemRating] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();
  const Url =
    "https://61b040683e2aba0017c4968e.mockapi.io/itemDetails?id=" + id;

  //Load the already stored data for the selected Item
  useEffect(() => {
    axios.get(Url).then((result) => {
      setItemName(result.data[0].itemName);
      setItemDescription(result.data[0].itemDescription);
      setItemPrice(result.data[0].itemPrice);
      setItemRating(result.data[0].itemRating);
    });
  }, []);

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

  //Get updated data and post it to API
  const updateData = (e) => {
    e.preventDefault();
    if (handleFormValidation()) {
      axios
        .put(`https://61b040683e2aba0017c4968e.mockapi.io/itemDetails/${id}`, {
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

  const { itemNameErr, itemDescErr, itemPriceErr, itemRatingErr } = formErrors;

  return (
    <div className=" app flex-col align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <Card.Body className="p-4">
                <Form onSubmit={updateData}>
                  <h1 className="item_title">Update Item</h1>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Item Name</InputGroup.Text>
                    <FormControl
                      placeholder="Enter Item name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      {...(itemNameErr ? "showError" : "")}
                    />
                    {itemNameErr && (
                      <div className="item_err">{itemNameErr}</div>
                    )}
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Item Description</InputGroup.Text>
                    <FormControl
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
                    <InputGroup.Text>Item Price</InputGroup.Text>
                    <FormControl
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
                    <InputGroup.Text>Item Name</InputGroup.Text>
                    <FormControl
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
                        <span>Update</span>
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

export default UpdateItem;
