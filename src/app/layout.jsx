import "./globals.css";
import React from "react";
import Nav from "./(components)/Nav";
import Footer from "./(components)/Footer";
import Provider from "./(components)/Provider";

export const metadata = {
  title: "Nashki Movie DB",
  description: "Movie Database By Nashki",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body >
          <Provider>
              <Nav />
              {children}
              <Footer />
          </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
