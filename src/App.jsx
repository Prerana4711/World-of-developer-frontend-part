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


// mongodb+srv://pgballia97_db_user:pt4m5s1uTJhLepWd@developerworld.l7aaoeu.mongodb.net/
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body></Body>}>
             <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
