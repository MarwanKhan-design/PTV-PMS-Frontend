import React, { Component } from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Companies from "./pages/Companies";
import Comparative from "./pages/Comparative";
import Enquiry from "./pages/Enquiry";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Quotations from "./pages/Quotation";
import SingleQuotation from "./pages/SingleQuotation";

export class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/" element={<Products />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/quotation/:id" element={<SingleQuotation />} />
            <Route path="/quotation/enquiry/:qid/:cid" element={<Enquiry />} />
            <Route
              path="/quotation/comparative/:id"
              element={<Comparative />}
            />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
