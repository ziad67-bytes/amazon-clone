
import { getAuth,
     createUserWithEmailAndPassword,
      signInWithEmailAndPassword , 
      GoogleAuthProvider,
      signInWithPopup} from "firebase/auth";

import './firebase.js'
import { useNavigate } from "react-router-dom";
import './Auth.css'
import logo from './img/logo-white.png'

const auth = getAuth();
const provider = new GoogleAuthProvider();




export function CreateAccount(){
    const navigate = useNavigate()
    function create(){
        const email = document.querySelector('.input-email').value;
        const password = document.querySelector('.input-password').value
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
      
          const user = userCredential.user;
          console.log(user)
          navigate('/')
      
        })
        .catch((error) => {
            alert(error)
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    function createGoogle(){
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate('/')
            }).catch((error) => {
                alert(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return(
        <div className="create-account">
            <img src={logo} alt="" className="logo-auth"/>
            <div className="main-auth">
                <h1>Créer un compte</h1>
                <h2>Votre adresse email : </h2>
                <input type="email" className="input-email" required/>
                <h2>Votre mot de passe</h2>
                <input type='password' className="input-password" required/>
                <h2>Entrer le mot de passe à nouveau</h2>
                <input type="password" className="input-repeat-password" required/>
                <button onClick={create} className="button-create">Créer un compte </button>
                <button onClick={createGoogle}>Créer un compte avec google</button>
            </div>
        </div>
    )
    

}

export function SignIn(){
    const navigate = useNavigate()

    function sign(){
        const email = document.querySelector('.input-email').value;
        const password = document.querySelector('.input-password').value
        console.log(email + '   '+password)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          navigate('/')

        })
        .catch((error) => {
            alert(error)
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    function signGoogle(){
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate('/')
            }).catch((error) => {
                alert(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }


    return(
        <div className="signIn">
            <img src={logo} alt="" className="logo-auth"/>
            <div className="main-auth">
                <h1>S'identifier</h1>
                <h2>Votre adresse email : </h2>
                <input type="email" className="input-email" required/>
                <h2>Votre mot de passe</h2>
                <input type='password' className="input-password" required/>
                <button onClick={sign}  className="button-connexion">Se connecter </button>
                <button onClick={signGoogle}>Se connecter avec google</button>
                <p>Pas encore Inscris ? <a href="/createaccount">Créer un compte</a></p>

            </div>
        </div>
    )
}




