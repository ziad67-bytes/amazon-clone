import { useEffect, useState } from "react";
import './panier.css';
import {doc, updateDoc, getFirestore,arrayRemove} from 'firebase/firestore';

const db = getFirestore()

export default function Panier(props){
    const [panier, setPanier] =useState(props.panier) ;
    const [prixTotal, setPrix] = useState(0);

    useEffect(()=>{
        setPanier(props.panier);
        let prix = 0
        props.panier.forEach(element => {
            prix += parseFloat(element.price)
        });
        setPrix(prix)
        }, [props.panier])

    const supp = async(target) =>{
        const liste = target.target.parentElement;
        const NodeParent = document.querySelector('.produit')
        .childNodes;

        for (const element in NodeParent) {
            if(NodeParent[element] === liste){
                await updateDoc(doc(db, props.user.email, props.user.uid),{
                    panier : arrayRemove(panier[element])
                }).catch((error)=>alert(error))
            }
        }
        
    }

    return(
        <section className="panier-page">
            <div className="gauche"> 
            <h1>Vos produits : </h1>
            <ul className="produit">
                {panier.map((element, index)=>(
                    <li key = {index} className="element-panier">
                        <img src= {element.image} className="image-panier"/>
                        <div className="text-panier">
                            <p className="title-panier">{element.name}</p>
                            <p className="price-panier">{element.price}$</p>
                            <p className="description-panier"> {element.description}</p>
                        </div>
                        <button className="add" onClick={supp}>Supprimer du panier</button>
                    </li>
                ))}
            </ul>
            </div>

            <div className="droite">
                <h2>Total ({panier.length}) : {prixTotal}$</h2>
                <button className="add">Effectuer le payement</button>
            </div>
        </section>
    )
}