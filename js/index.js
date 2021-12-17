import {
  introDescription,
  introHeading,
  introText,
} from "../constants/appConstants.mjs";

import { typeWrite } from "./utils/string.mjs";

const loadingDOM = document.getElementById("intro-loading");
const introDOM = document.getElementById("intro");
const headerDOM = document.getElementById("header");

loadingDOM.onanimationend = async () => {
  introDOM.removeChild(loadingDOM);

  headerDOM.classList.add("header--loaded");
  introDOM.classList.add("intro--loaded");

  const introHeadingDOM = document.createElement("h4");
  introHeadingDOM.setAttribute("class", "intro-heading");
  introDOM.appendChild(introHeadingDOM);

  await typeWrite(introHeadingDOM, introHeading, 300);

  const introTextDOM = document.createElement("h4");
  introTextDOM.setAttribute("class", "intro-text");
  introDOM.appendChild(introTextDOM);

  await typeWrite(introTextDOM, introText, 400);

  const introDescriptionDOM = document.createElement("h4");
  introDescriptionDOM.setAttribute("class", "intro-description");
  introDOM.appendChild(introDescriptionDOM);

  introDescriptionDOM.innerHTML = introDescription;
};
