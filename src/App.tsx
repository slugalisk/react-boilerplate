import "bootstrap/dist/css/bootstrap.css";

import "./styles/App.scss";

import React from "react";
import orders from "./orders"

import { Order } from "./tos_pb";
import { debug } from "webpack";

// const orders = require("./orders.ts");

// let order: Order = Object.assign(new Order(), orders[0]);

let order :Order = orders[0];


let asd = order.getId(); // this returns nothing FeelsPepo
debugger;

function render() {
  return (
    <div className="px-3">
      <div className="col-3 pt-4">
        <div className="order">
          <div className="order-title p-2">
            <div className="d-flex justify-content-between">
              <div className="order-name">Ordered by: name {order.getName()}</div>
              <div className="order-status">Order status: active</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="order-time-ordered">Time ordered: 13:00</div>
              <div className="order-total-price"> Total: 444$</div>
            </div>
          </div>
          <div className="line-break"></div>
          <div className="item-list">
            {/* for each item */}
            <div className="item pl-3">
              <div className="d-flex justify-content-between">
                <div className="item-name">Item Name : steak</div>
                <div className="item-price">Item price: 123123$</div>
              </div>
              <div className="item-options pl-5">
                {/* for each option */}
                <div className="d-flex justify-content-between">
                  pickles
                  <input className="text-center p-" type="checkbox" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default render;

{
  /*
    "id": 2,
    "items": [
      {
        "id": 1,
        "name": "LG Smoked Pulled Pork",
        "options": [
          {
            "name": "pickles",
            "selected": true
          }
        ],
        "orderItemID": 2,
        "price": 495
      }
    ],
    "name": "Majora",
    "status": "active",
    "time_ordered": "2020-10-12 13:02:02",
    "total": 495
 */
}
