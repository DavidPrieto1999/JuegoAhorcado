const arregloPalabras = ["Guerrero","Lulu","Rodolfo"];


//Definir variables

let flag = false;

//configuracion inicial.
const OcultarAgregarPalabra = document.querySelector(".AgregarPalabra").style.display="none";
const OcultarBotones = document.getElementById("BotonesMenuPrincipal");
const hombreAhorcado2 = document.getElementById("hombreAhorcado");
const Audio = document.querySelector(".audio"); 

const FinDeJuego = document.getElementById("finDeJuego");
const btnAgregarPalabra = document.querySelector(".btnAgregarPalabra");
  
const btnIniciarJuego = document.querySelector(".btnIniciarJuego");
//Reset valores preestablecidos


const mensaje = document.querySelector(".mensaje");
mensaje.innerHTML="";

const btnNuevoJuego = document.querySelector(".btnNuevoJuego");
const btnDesistir= document.querySelector(".btnDesistir");








let template=document.querySelector(".LetrasCorrectas");
template.innerHTML = "";

let temp=document.querySelector(".LetrasErradas");
temp.innerHTML = "";

const terminarJuego=()=>{
    document.removeEventListener('keydown', LetraPulsada);
};
/****************************************** */
//disminuir el numero de vidas establecidas.
//Dibujar el estado del ahorcado segun las vidas establecidas.
//generar mensaje de fin de juego, si vidas=0.

const HombreAhorcado = document.getElementById("dibujoAhorcado");



const Vidas = ()=>{
    
    vidas--; 
    dibujo++;
    // console.log(vidas)
    
    if (dibujo<=8){
        HombreAhorcado.src= "imagenes/" + dibujo + ".png";
    }
    else{
        
        dibujoAhorcado.style.display="none"
        FinDeJuego.style.display="";
        HombreAhorcado.src= "imagenes/" + dibujo + ".mp4"+`controls autoplay loop`;
       
    }
    
   
    if (vidas===0) {
        terminarJuego();
        mensaje.innerHTML="Fin del juego! 🤪, la palabra es: " + PalabraSel;
    }
    return vidas
}



//dibujar letra que no pertenecen a la palabra a adivinar
const LetraErrada = () =>{
    template = document.querySelector(".LetrasErradas");
    template.innerHTML="";
    for(let letra of PalabrasIncorrectas){
        let span = document.createElement("span");
        let txt = document.createTextNode(letra);   
    
        span.setAttribute('class','letra errada');
        span.appendChild(txt);
        template.appendChild(span);
    }
}

//La letra correcta se imprime en pantalla en la posicion correspondiente.
const LetraCorrecta = ()=>{
    const palabra = PalabraSeleccionada;
    
    let template=document.querySelector(".LetrasCorrectas");
    template.innerHTML="";
    LetrasAcertadas = 0;
    for(let letra of palabra){
        
        let span = document.createElement("span");
        let txt = document.createTextNode("");   
        if(LetrasCorrectas.indexOf(letra)>=0)   {
            txt.nodeValue=letra;  
            LetrasAcertadas++;
            // console.log(LetrasAcertadas)
        } 
        span.setAttribute('class','letra adivinada');
        span.appendChild(txt);
        template.appendChild(span);
    }
    
    if(LetrasAcertadas === palabra.length) {
        mensaje.innerHTML="Ganaste, felicidades! 😀";
        terminarJuego();
    } 
}


//determinar si la letra pertenece o no a la palabra a adivinar.
//si es correcta, se ingresa al arreglo de letras digitadas y tambien al de palabras correctas
const LetrasIngresadas = letra => {
    if(PalabraSeleccionada.includes(letra)) {
        LetrasCorrectas.push(letra);
        LetraCorrecta();
    } else {
        PalabrasIncorrectas.push(letra);
        Vidas();
        LetraErrada();
    }
    ArregloLetraDigitada.push(letra);//permite almacenar y verificar todas las letras digitadas
};

//Detectar la letra pulsada por teclado
const LetraPulsada = event => {
    let LetraDigitada = event.key.toUpperCase();
        if(LetraDigitada.match(/^[a-z]$/i) && !ArregloLetraDigitada.includes(LetraDigitada) ) {    
            LetrasIngresadas(LetraDigitada);
        }
}

//Selecciona aleatoriamente, una palabra de la base de palabras prestablecidas.
const selectAleatorioPalabra = () => {
    let palabra = arregloPalabras[Math.floor((Math.random() * arregloPalabras.length))].toUpperCase();
    PalabraSel=palabra;
    PalabraSeleccionada = palabra.split('');
}

//iniciar variables para nuevo juego
const NuevoJuego = () => {
    //Definir variables
    PalabraSeleccionada="";
    vidas = 9;
    console.log(vidas)
    dibujo = 0;
    LetraDigitada="";
    LetrasAcertadas= 0;
    LetrasCorrectas=[];
    PalabrasIncorrectas=[];
    ArregloLetraDigitada=[];
    PalabraSel="";
    
  
    // HombreAhorcado.src= "imagenes/1.png";

    // Poner audio
    dibujoAhorcado.style.display=""
    HombreAhorcado.src= "imagenes/0.png";
    FinDeJuego.style.display="none"




    if (vidas==8){
        HombreAhorcado.style.top="-1000px";

    }
    // HombreAhorcado.style.display="none"
    OcultarBotones.style.display="none";

    //ocultar elemetos del tablero    
    
    document.querySelector(".LetrasCorrectas").style.display="";
    document.querySelector(".LetrasErradas").style.display="";
    document.querySelector(".botones").style.display="";
    //reset
    
    mensaje.innerHTML="";//limpiar mensaje gana o pierde

    let temp=document.querySelector(".LetrasErradas");
    temp.innerHTML = "";
    
    if(flag){
        let palabra =arregloPalabras[arregloPalabras.length-1];
        PalabraSel=palabra;
        //palabraSeleccionada = palabra.split('');
        PalabraSeleccionada = palabra.split('');
        flag = false;
    }
    else {
        selectAleatorioPalabra();
    }    

    LetraCorrecta();  

    document.addEventListener('keydown', LetraPulsada);
}

const desistir = ()=>{
    //regresar al menu anterior
   OcultarBotones.style.display="";
 
   //ocultar elemetos del tablero    
   mensaje.innerHTML="";
 
   HombreAhorcado.src= "imagenes/1.png";
   document.querySelector(".LetrasCorrectas").style.display="none";
   document.querySelector(".LetrasErradas").style.display="none";
   document.querySelector(".botones").style.display="none";

   FinDeJuego.style.display="none";
   vidas=9
   

   
}

//iniciar vista para agregarPalabra
const MostrarMenuPalabra = ()=>{
   OcultarAgregarPalabras.style.display="";
   document.getElementById("AgregarPalabra").value="";

   //ocultar menu principal
   document.getElementById("BotonesMenuPrincipal").style.display="none";
}
//Sonido

let Sonido = document.querySelector(".btnIniciarJuego")

Sonido.addEventListener("click", () => {
    let etiquetaAudio = document.createElement("audio");
    // console.log(etiquetaAudio)
    etiquetaAudio.setAttribute("src", "Sonidos/super-mario-bros-juego.mp3");
    etiquetaAudio.play();
    etiquetaAudio.loop=true;
    etiquetaAudio.className="Audio"
    // console.log(etiquetaAudio)
    let pause =document.querySelector(".btnDesistir");

    
    pause.addEventListener("click", () => {
        etiquetaAudio.pause();})

    

        
})

let Sonido2 = document.querySelector("#BotonGuardarEmpezar")

Sonido2.addEventListener("click", () => {
    let etiquetaAudio = document.createElement("audio");
    // console.log(etiquetaAudio)
    etiquetaAudio.setAttribute("src", "Sonidos/super-mario-bros-juego.mp3");
    etiquetaAudio.play();
    etiquetaAudio.loop=true;
    etiquetaAudio.className="Audio"
    // console.log(etiquetaAudio)
    let pause =document.querySelector(".btnDesistir");

    
    pause.addEventListener("click", () => {
        etiquetaAudio.pause();})

    

        
})













desistir();


btnNuevoJuego.addEventListener('click', NuevoJuego);
btnDesistir.addEventListener('click', desistir);
btnIniciarJuego.addEventListener('click', NuevoJuego);
btnAgregarPalabra.addEventListener('click',MostrarMenuPalabra);

