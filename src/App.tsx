import React from "react";
import './App.scss';
import titleLogo from './images/titleLogo.png';

const App = () => {

    return(
     <div className="container">
         <div className="row">
             <h1 className="title">
                 Qui êtes vous ?
             </h1>
         </div>
         <div className="row">
             <div className="col-12">
                 <button className="btn entreprise btn-lg">
                     entreprise
                 </button>
             </div>
         </div>
         <div className="row">
             <div className="col-6">
                 <img className="img-fluid titleLogo" src={titleLogo} alt=""/>
             </div>
             <div className="col-6">
                 <button className="btn association btn-lg" style={{backgroundColor: "darkolivegreen"}}>
                     association
                 </button>
             </div>
         </div>
         <div className="row">
             <div className="col-12">
                 <button className="btn benevole btn-lg" style={{backgroundColor: "yellowgreen"}}>
                     bénévole
                 </button>
             </div>
         </div>
     </div>
    );
}

export default App;