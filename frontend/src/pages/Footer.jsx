import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <MDBContainer className="text-center">
        {/* Social Media Icons */}
        <section className="mb-6">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 transition-transform transform hover:scale-110"
            href="https://www.facebook.com"
            target="_blank"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 transition-transform transform hover:scale-110"
            href="https://www.twitter.com"
            target="_blank"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 transition-transform transform hover:scale-110"
            href="https://www.instagram.com"
            target="_blank"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 transition-transform transform hover:scale-110"
            href="https://www.linkedin.com"
            target="_blank"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 transition-transform transform hover:scale-110"
            href="https://github.com"
            target="_blank"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>

        {/* Contact Information */}
        <section className="text-center mb-6">
          <p className="text-lg font-medium">Get in touch with me!</p>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a
              href="mailto:your.email@example.com"
              className="hover:text-white"
            >
              bhubohara@gmail.com
            </a>
          </p>

          <p className="text-sm text-gray-400">
            Phone:{" "}
            <a href="tel:9860096953" className="hover:text-white">
              9860096953
            </a>
          </p>

          <p className="text-sm text-gray-400">
            Address: <span className="hover:text-white">Kathmandu, Nepal</span>
          </p>
        </section>

        {/* Copyright Information */}
        <section className="text-center mt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Bhupendra Bohara. All rights
            reserved.
          </p>
        </section>
      </MDBContainer>
    </footer>
  );
}

export default Footer;
