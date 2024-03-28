import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../component/modal";
import Private from "./profile";
import Metrics from "./metrics";
import { Context } from "../store/appContext";
import AccountModel from "../component/accountModel";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      {/* <Modal /> */}
      {/* <Private /> */}
      <AccountModel />
      <Metrics />
    </div>
  );
};
