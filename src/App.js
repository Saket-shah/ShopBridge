import Header from "./Components/Header";
import "./App.css";
import AddItem from "./Components/AddItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListItems from "./Components/ListItems";
import UpdateItem from "./Components/UpdateItem";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <br />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/addItem" element={<AddItem />}></Route>
            <Route exact path="/listItems" element={<ListItems />}></Route>
            <Route
              exact
              path="/updateItem/:id/"
              element={<UpdateItem />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
