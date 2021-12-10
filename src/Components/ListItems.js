import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/AddItem.css";

function ListItems() {
  const [itemData, setitemData] = useState([]);
  const URL = "https://61b040683e2aba0017c4968e.mockapi.io/itemDetails";
  const navigate = useNavigate();

  //Fetch the data from API once the page loads
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setitemData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Pass the id of item which needs to be updated
  const updateItem = (id) => {
    console.log(id);
    navigate("/updateItem/" + id);
  };

  const getData = () => {
    axios
      .get(URL)
      .then((getData) => {
        setitemData(getData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Delete selected item through Id and will show the updated list
  const deleteItem = (id) => {
    axios
      .delete(URL + `/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let serialNo = 1;
  return (
    <div className="text-center">
      <Row>
        <Col>
          <Card>
            <h1 className="item_title">Item List</h1>

            <Card.Body>
              <Table striped bordered hover responsive size="md" variant="dark">
                <thead>
                  <tr>
                    <th></th>
                    <th>Item Name</th>
                    <th> Description</th>
                    <th> Price</th>
                    <th> Rating</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((data) => {
                    return (
                      <tr>
                        <td>{serialNo++}</td>
                        <td>{data.itemName}</td>
                        <td>{data.itemDescription}</td>
                        <td>{data.itemPrice}</td>
                        <td>{data.itemRating}</td>
                        <td>
                          <Button
                            variant="light"
                            onClick={() => updateItem(data.id)}
                          >
                            Update
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="secondary"
                            onClick={() => deleteItem(data.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ListItems;
