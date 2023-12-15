import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Redirect = lazy(() => import("../pages/Redirect"));

const Routese = () => {
  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routese;
