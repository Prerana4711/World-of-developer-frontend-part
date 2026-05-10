import React, { useRef, useMemo, useCallback } from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "./appstore";
import Feed from "./Feed";
import Connections from "./Connections";
import Request from "./Request";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body></Body>}>
             <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/view" element={<Profile />} />
              <Route path="/user/connection" element={<Connections />} />
              <Route path="/user/requests/recieved" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
