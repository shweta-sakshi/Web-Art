import React from 'react'
import "./home.css"
import { Avatar } from '@mui/material';
import Postcard from './Postcard';
function Home() {
  return (
    <div className='post'>
      <div className="post__header">
        
        <div className="post__headerAuthor">
        <Avatar>R</Avatar>
        risha_.<span>12h</span>
        <Postcard/>
        </div>

        <div className="post__headerAuthor">
        <Avatar>R</Avatar>
        shivangi_.<span>2h</span>
        <Postcard/>
        </div>

        <div className="post__headerAuthor">
        <Avatar>R</Avatar>
        shweta_.<span>16h</span>
        <Postcard/>
        </div>

        <div className="post__headerAuthor">
        <Avatar>R</Avatar>
        sakshi_.<span>24h</span>
        <Postcard/>
        </div>
      </div>
      <div className="post__image">

      </div>
      <div className="post__footer">

      </div>
    </div>
  )
}

export default Home
