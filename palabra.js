const nuevasPalabras= document.getElementById("BotonGuardarEmpezar");
const btnCancelar = document.getElementById("BotonCancelar");
const OcultarAgregarPalabras = document.querySelector(".AgregarPalabra");

var msg = document.querySelector(".validarMensaje"); 
msg.innerHTML="";    

// const mostrarMenuPalabra = ()=>{
//   ocultarAgregarPalabras.style.display="";
// }


//validar nueva palabra

const mensajes = ()=>{
    msg.innerHTML="";
}

const cancelar = ()=>{
  //btnCancelar.style.display="none";
  OcultarAgregarPalabras.style.display="none";
  OcultarBotones.style.display="";

}

const  nuevaPalabra = ()=>{
  //texto.value = "FAm";
  const texto = document.getElementById("AgregarPalabra");
  //var msg = document.getElementById("validarMensaje");
  //msg.value="";
  msg.innerHTML="";
  if ((texto.value.length <= 8) && texto.value.match(/^[a-z]+$/i)){
    arregloPalabras.push(texto.value.toUpperCase());
    flag = true;
    cancelar();
    NuevoJuego();
  }
  else
  {
    let span = document.createElement("span");
    let txt = document.createTextNode("palabra no valida");   
    
    span.setAttribute('class','AgregarPalabra');
    span.appendChild(txt);
    msg.appendChild(span);

    setTimeout(mensajes, 3000);

  }
}

nuevasPalabras.addEventListener('click', nuevaPalabra);
btnCancelar.addEventListener('click',cancelar);