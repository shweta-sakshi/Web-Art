import { Center } from "@chakra-ui/react";
import React from "react";

const post = () => {
  return (
    <>

    
      <div
        className="card input-filed"
        style={{
          margin: "50px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input type="text" placeholder="title" />
        <input type="text" placeholder="body" />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Post</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Sumit Post
        </button>
      </div>
    </>
  );
};

export default post;
