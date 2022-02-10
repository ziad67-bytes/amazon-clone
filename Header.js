import './Header.css';
import logo from './img/logo.png'
import search from './img/search.png';
import panier from './img/panier.png';
import './firebase.js'
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";

const auth = getAuth();



export function Header(props){
    const [nbrArticle, setNbrArticle] = useState(0)
    function SignOut(){
        signOut(auth)
        .then(()=>{alert("Déconnecter")})
        .catch((error)=>{alert(error)})
    }


    return (
        <header>
        <a href="/"><img src= {logo} alt='logo' className='logo' /></a>
        <div className='search'>
            <input type="text"/>
            <img src= {search}alt="search-button" className='search-button'/>
        </div>

        <div className='id'>
            <p>Hello {props.user}</p>
            {props.verifyConnect 
            ? <a onClick={SignOut} href='/signIn'>Se déconnecter</a>
            : <a href="/signIn">S'identifier/Créer un compte</a>
            }   
        </div>
        <a href="???" className='commande'>
            Retours  <strong>et Commande</strong> 
        </a>
        <div className='panier'>
            <p className='nbr-panier'>{props.nbrPanier}</p>
            <a href="/panier"><img src= {panier} alt="panier" className='panier-logo'/></a>
        </div>

        </header>
    )
}