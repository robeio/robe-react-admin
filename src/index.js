import React from "react";
import { render } from "react-dom";
import Switch from "app/Switch";// eslint-disable-line import/no-unresolved
import Application from "robe-react-commons/lib/application/Application";

const app = document.getElementById("app");

// ****FOR PROD****
// window.applicationRootPath = "/robe/admin-ui/";

// ****FOR DEV****
// window.applicationRootPath = "/";


Application.setBaseUrlPath("http://127.0.0.1:8081/robe");


render((<Switch />), app);
