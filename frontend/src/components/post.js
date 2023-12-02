import React, { useEffect, useState } from "react";
//import * as React from 'react';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//for uploadig image UI.
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Post = () => {

  const history = useNavigate();

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {

          if (data.error) {
            toast.error("Ensure ", {
              position: "top-center"
            });
          }
          else {
            toast.error("Posted successfully", {
              position: "top-center"
            });
            history('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }, [url, title, body, history])



  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "Infinity-Link")
    data.append("cloud_name", "dtfxyzdyy")
    fetch("https://api.cloudinary.com/v1_1/dtfxyzdyy/Infinity-Link/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log("error while uploading image");
      })

  }

  return (
    <>
        <div 
          style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
          }}
        >
          {/* <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Uplaod Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div> */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0.5, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="title" variant="standard" />
            <TextField id="standard-basic" label="body" variant="standard" />
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <Button variant="contained"
            onClick={() => {
              postDetails()
              setTitle("")
              setBody("")
              setImage(null)
              setUrl("")
            }}
          >
            Submit post
          </Button>
        </div>
    </>
  );
};

export default Post;
