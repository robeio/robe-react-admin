import React from "react";
import {render} from "react-dom";
import Switch from "app/Switch";// eslint-disable-line import/no-unresolved

const app = document.getElementById("app");

// ****FOR PROD****
// window.applicationRootPath = "/robe/admin-ui/";

// ****FOR DEV****
window.applicationRootPath = "/";


render((<Switch />), app);
