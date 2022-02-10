import HomePage from './HomePage.js';
import { Header } from './Header.js';
import {SignIn, CreateAccount} from './Auth.js';
import Panier from './Panier.js'
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import { doc, setDoc , getFirestore, onSnapshot, getDoc} from "firebase/firestore"; 

const auth = getAuth();
const db = getFirestore();


export default function App(){

    const createData = async(userId, user) =>{
        try {
            const docSnap = await getDoc(doc(db, user, userId))
            if(docSnap.exists()){
            }else{
                const docRef = await setDoc(doc(db,user,userId), {
                    panier : [],
                    commande : []
                });
            }
          } catch (e) {
            alert("Error adding document: ", e);
            console.log(e)
          }
          
    }    

    const readData = (name, id) =>{
        const unsub = onSnapshot(doc(db, name, id), (doc)=>{
            console.log(doc.data());
            setPanier(doc.data().panier)
            console.log(panier)
        })
    }

  const [userName, setUserName] = useState();
  const [user, setUser] = useState();
  const [verifyConnect, setVerifyConnect] = useState();
  const [panier, setPanier ] = useState([]);


  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
        setUser(user)
        createData(user.uid, user.email)

        const unsub = onSnapshot(doc(db, user.email, user.uid), (doc)=>{
            console.log(doc.data());
            const data = doc.data()
            setPanier(data.panier)
        })
        
        if(user.displayName === null){
            setUserName(user.email)
        }else{
            setUserName(user.displayName)
        }
        setVerifyConnect(true)
    } else {
        console.log('user signed out')
        setVerifyConnect(false)
    }
    });


  }, [])

  return(
    <Router>
        <Header user = {userName}  verifyConnect = {verifyConnect} nbrPanier = {panier.length}/>
        <Routes>
          <Route path='/' element = {<HomePage panier = {panier} userName = {userName} user = {user} verify = {verifyConnect}/>} />
          <Route path = '/signIn' element = {<SignIn/>} />
          <Route path = '/createaccount' element =  {<CreateAccount/>} />
          <Route path = '/panier' element = {<Panier panier = {panier} user = {user} />} />
        </Routes>        
    </Router>
  )
}