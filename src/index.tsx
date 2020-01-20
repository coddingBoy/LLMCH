import * as React from 'react';
import * as ReactDOM from "react-dom";
import 'global'
import App from './app';

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
