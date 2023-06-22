const imagens = [
    'img/forca1.png',
    'img/forca2.png',
    'img/forca3.png',
    'img/forca4.png',
    'img/forca5.png',
    'img/forca6.png'
]

const palavras = [ "ameixa", "angola", "abafar", "amadeu", "ananas", "brasil", "abanar", "andre", "banana", "canada", "acenar", "arthur",
"bacuri", "chipre", "afagar", "ariete", "cereja", "egipto", "chamar", "daniel", "israel", "anotar", "naiara", "tomate", "servia", "fechar",
"mateus", "mexico", "buscar", "rafael", "goiaba", "zambia", "deitar", "chipre", "beijar", "alanna", "russia", "educar", "marcos","lichia",
"gambia", "enviar", "dayana", "uganda", "ajudar", "melany", "frança", "cantar", "alexia", "itália", "filmar", "felipe", "grecia", "calcar", 
"mayara", "suecia", "chorar", "thiago", "entrar", "tamara", "chutar", "sergio", "dormir", "miguel"];

const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
const letrasErradas = [];
const letrasCorretas = [];
let contador = 0;
let i = 0;

document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode;
    console.log("evento", codigo) // intervalo de 65 - 90 tabela ASCII
    if(isLetra(codigo)) {
        const letra = evento.key;
        if(letrasErradas.includes(letra)){
            mostrarAvisoLetraRepetida();
        } else {
            if(palavraSecreta.includes(letra)){
                letrasCorretas.push(letra);
            } else {
                letrasErradas.push(letra);
                mostrarLetrasErradas();
                mostrarLetrasCertas();
                desenharForca();
                checarJogo();
            }
        }

        atualizarJogo();

    }
});

function atualizarJogo() {
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}
function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h2>Letras Erradas</h2>";
    letrasErradas.forEach(letra => {
        div.innerHTML += `<span>${letra}</span>`;
    });
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavras-secretas-container");
    container.innerHTML = "<h2>Tente Adivinhar a Palavra</h2>";
    palavraSecreta.split("").forEach(letra => {
        if(letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += '<span>_</span>';
        }
    });
}

function checarJogo() {
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-container");

    if(letrasErradas.length === partesCorpo.length) {
        mensagem = "Fim do Jogo! Tu perdeste!";
    }
    
    if(palavraSecreta === container.innerText){
        mensagem = "Parabens! Ganhaste!";
    }

    if(mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function desenharForca() {
    const partesCorpo = document.querySelectorAll(".forca-container");
    for(let i = 0; i < letrasErradas.length; i++) {
        if (i < partesCorpo.length) {
            partesCorpo[i].querySelector("img").src = imagens[contador];
            contador = contador + 1;
        }    
    }
}

function mostrarAvisoLetraRepetida(){
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 1000)
}

function isLetra(codigo) {
    return codigo >= 65 && codigo  <= 90;
}

function reiniciarJogo() {
    window.location.reload();
}