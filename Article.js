import { useEffect, useState } from 'react'
import { collection, addDoc ,getFirestore, setDoc, doc,updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 

import './firebase.js';
import './Article.css';

const db = getFirestore();


export default function Article(props){
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

    const nbr = getRandomInt(0,19)
    const data = {
        title : props.data[nbr].title,
        price : props.data[nbr].price,
        description : props.data[nbr].description,
        image : props.data[nbr].image,
        rating : props.data[nbr].rating.rate
    }

    const createData = async(target) =>{

        const ListElement = target.target.parentElement.childNodes
        
        try {
             await updateDoc(doc(db,props.id.email,props.id.uid), {
                panier : arrayUnion({
                name : ListElement[1].innerText,
                description : ListElement[3].innerText,
                price : ListElement[2].childNodes[0].innerText,
                image  : ListElement[0].src
                })

            });
          } catch (e) {
            alert("Error adding document: ", e);
            console.log(e)
          }
          
    }    
    return( 
        <div className='article'>                       
            <img className = 'image' src={data.image}/>
            <a href = '???'className='title'>{data.title}</a>
            <p className='price'><strong>{data.price}</strong>$</p>
            <p className='description'>{data.description}</p>
            <button onClick={createData} className='add'>Ajouter au panier</button>
        </div>
    )
}