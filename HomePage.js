import './HomePage.css';
import {Header} from './Header.js';
import Article from './Article.js';
import { useEffect, useState } from 'react';
import data from './product'
import Banniere from './Carousel.js'
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";

const auth = getAuth();

function HomePage(props) {
  const user = props.user
  return(
    <div>
      <section>
        <div className='ban'>
          <Banniere />
          <div className='degrade'></div>
        </div>
        <div className='article-containeur'>
          <div className='article-1'>
              <Article data = {data} id = {user} />
              <Article data = {data} id = {user} />
              <Article data = {data} id = {user} />
              <Article data = {data} id = {user} />
          </div>

          <div className='article-2'>
          <Article data = {data} id = {user} />
          <Article data = {data} id = {user} />
          </div>

          <div className='article-1'>
          <Article data = {data} id = {user} />
          <Article data = {data} id = {user} />
          <Article data = {data} id = {user} />
          <Article data = {data} id = {user} />
          </div>
        </div>        
      </section>

    </div>

  )
}

export default HomePage;
