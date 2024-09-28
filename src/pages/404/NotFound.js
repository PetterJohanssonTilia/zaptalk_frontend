import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';


const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="mb-4">Oops! This page doesn&apos;t exist!</h1>
        <Link to='/' className="btn btn-dark text-white d-flex align-items-center justify-content-center">
          <ArrowLeft size={24} className="me-2" />
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;