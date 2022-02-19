import {
  introDescription,
  introHeading,
  introText,
  slogan,
} from "./constants/appConstants.mjs";

import { typeWrite } from "./utils/string.mjs";

const introDOM = document.getElementById("intro");
const headerDOM = document.getElementById("header");
const loadingDOM = document.getElementById("intro-loading");

const root = document.querySelector(":root");
const rootStyle = getComputedStyle(root);
const toggleBtn = document.getElementById("toggle");

console.log(toggleBtn);

const darkFont = "#97e6f1";
const darkBackground = "#000";
const lightFont = "#000";
const lightBackground = "#fff";

toggleBtn.addEventListener("change", function (e) {
  const currentValue = e.target.checked;
  if (currentValue) {
    root.style.setProperty("--background-clr", darkBackground);
    root.style.setProperty("--font-clr", darkFont);
    return;
  }
  root.style.setProperty("--background-clr", lightBackground);
  root.style.setProperty("--font-clr", lightFont);
});

loadingDOM.onanimationend = async () => {
  introDOM.removeChild(loadingDOM);

  headerDOM.classList.add("header--loaded");
  introDOM.classList.add("intro--loaded");

  const introHeadingDOM = document.createElement("h4");
  introHeadingDOM.setAttribute("class", "intro__heading");
  introDOM.appendChild(introHeadingDOM);

  await typeWrite(introHeadingDOM, introHeading, 100);

  const introTextDOM = document.createElement("h4");
  introTextDOM.setAttribute("class", "intro__text");
  introDOM.appendChild(introTextDOM);

  await typeWrite(introTextDOM, introText, 400);

  const introDescriptionDOM = document.createElement("h4");
  introDescriptionDOM.setAttribute("class", "intro__description");
  introDOM.appendChild(introDescriptionDOM);

  introDescriptionDOM.innerHTML = introDescription;

  const introSloganDOM = document.createElement("div");
  introSloganDOM.setAttribute("class", "intro__slogan");
  introDOM.appendChild(introSloganDOM);

  await typeWrite(introDescriptionDOM, " ", 1000);
  await typeWrite(introSloganDOM, slogan, 100);
};
