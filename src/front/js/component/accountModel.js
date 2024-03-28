import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export default function AccountModel() {
  const { store, actions } = useContext(Context);
  let user = store.user;
  const [email, setEmail] = useState();
  const [weight, setWeight] = useState();
  const [activity_level, setActivity_level] = useState();

  useEffect(() => {
    setEmail(user.email);
    setWeight(user.weight);
    setActivity_level(user.activity_level);
  }, []);
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Congrats! You've met your goal!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>Weight</p>
            <input
              type="weight"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
            <label htmlFor="cars"> Activity Level:</label>
            <select name="Activity_level">
              <option value="active">Very Active</option>
              <option value="less">Less</option>
              <option value="none">None</option>
            </select>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={actions.updateUser}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
