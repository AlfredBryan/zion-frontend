import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddProducts from "./components/Products/AddProducts";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add_products" component={AddProducts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign_up" component={Register} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  );
}

export default App;
