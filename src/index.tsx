import * as React from "react";
import * as ReactDOM from "react-dom";

import { Helloworld } from "./components/Hello";

ReactDOM.render(
    //component to be rendered
    <Helloworld compiler="typescript" framework="react"/>,
    //where render to
    document.getElementById("first")
)