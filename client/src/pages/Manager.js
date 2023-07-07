import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";

export default function Manager() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <h2>Manager</h2>
    </>
  );
}

