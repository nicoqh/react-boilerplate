import React from "react";
import ReactDOM from "react-dom";

function Root() {
  return <h1>Hello, world.</h1>;
}

// Render the Root element into the DOM
ReactDOM.render(<Root />, document.getElementById("root"));

// If you're using React 18, you can use the new root API:
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
