import React from "react";
import {render} from "react-dom";
import Switch from "app/Switch";
import Application from "robe-react-commons/lib/application/Application";
import Locale from "assets/en_US.json";// eslint-disable-line import/no-unresolved

const app = document.getElementById("app");

// ****FOR PROD****
// window.applicationRootPath = "/robe/admin-ui/";

// ****FOR DEV****
// window.applicationRootPath = "/";


Application.setBaseUrlPath("http://127.0.0.1:8081/robe");
Application.loadI18n(Locale);


render((<Switch />), app);
