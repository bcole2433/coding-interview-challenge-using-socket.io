import React from "react";
import { Navbar } from "react-bootstrap";

const Nav = () => {
    return (
        <Navbar bg="light" variant="light">
        <Navbar.Brand >
          <img
            alt=""
            src="https://s3.amazonaws.com/static-images.padpiper.com/logos/padpiper-primary.png"
            width="180"
            height="50"
            className="d-inline-block align-center"
          />
        </Navbar.Brand>
      </Navbar>
);
};

export default Nav;