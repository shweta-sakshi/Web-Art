import React, { useEffect, useState } from "react";
import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

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
  }, [url])

  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "Infinity-Link")
    data.append("cloud_name", "dtfxyzdyy")
    fetch("cloudinary://432634722868918:ZYf8lov0zQgXCOR1yL1SCBvhmzM@dtfxyzdyy/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <>

      <div className="card input-filed"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
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
        </div>
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => postDetails()}

        >
          Submit post
        </button>

      </div>
    </>
  );
};

export default Post;
