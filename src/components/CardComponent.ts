import React, { ReactComponent } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import backCard from "../../public/backcard.png";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "card-component",
  templateUrl: "card-component.html",
  styleUrls: ["card-component.scss"]
})
export class CardAnimation implements OnInit {
  constructor() {}
}
