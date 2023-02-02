
var asPerguntas = [["CARAMBOLA", "FRUTA"], ["PITOMBA", "FRUTA"], ["CAJAMANGA", "FRUTA" ],
["FORTALEZA", "CIDADE"], ["IRACEMÁPOLIS", "CIDADE"], ["TERESÓPOLIS", "CIDADES"       ],
["MARTELO", "FERRAMENTA"], ["FORMÃO", "FERRAMENTA"], ["SERRA TICO-TICO", "FERRAMENTA"],
["STROGONOFF", "COMIDA"], ["BAIÃO DE DOIS", "COMIDA"], ["VACA ATOLADA", "COMIDA"     ],
["CORSA", "CARRO"], ["UNO", "CARRO"], ["FUSCA", "CARRO"                              ],
["CALANCHUÊ", "FLOR"], ["GÉRBERA", "FLOR"], ["ORQUÍDEA", "FLOR"                      ],
["WILL SMITH", "ATOR"], ["THE ROCK", "ATOR"], ["DWAYNE JOHNSON", "ATOR"             ],
["BOB SPONJA", "PERSONAGEM"], ["NARUTO", "PERSONAGEM"], ["SHREK", "PERSONAGEM"       ],
["LEAGUE OF LEGENDS", "JOGOS"], ["MINECRAFT", "JOGOS"], ["THE LAST OF US", "JOGOS"   ]];

//Teclas do teclado
let acTeclas1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let acTeclas2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'];
let acTeclas3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M','-'];

//Vetor para realizar uma mistura
let aiSorteados = [];

//Quantidade de jogadas feitas para busca do vetor de sorteados
let iJogadas = 0;

//Armazena a palavra sorteada
let sPalaSorteada;

//Contagem de letras certas
let iAcertos=0;

//Contagem de letras erradas
let iErro=0;

//Guarda a letra clicada para poder desabilita-la
let cLetraClicada

//Vetor com todas as letras
let asLetras=['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
             'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç',
             'Z', 'X', 'C', 'V', 'B', 'N', 'M','-']

//letiavel que conta os acertos e erros
let iCertas=0,  iErradas=0;

function criaLetras(sPalavra){
    let formulario = id("tenta");
    let j=0;
    for(let i=0;i<sPalavra.length;i++){
        //Se for diferente de espaço (ASCII - 32)
        if(sPalavra[i].charCodeAt(0)!=32){
            //Cria o INPUT para cada letra
            let letra = document.createElement("input");
            //Define os atributos do input
            letra.setAttribute("type","text");
            letra.setAttribute("id","tenta"+j);
            letra.setAttribute("maxlength",1);
            letra.setAttribute("size",1);
            letra.setAttribute("disabled",true);
            letra.setAttribute("class","btnjogo")
            //Adicionar o INPUT ao formulario
            formulario.appendChild(letra);
            j++;
        }else{
            //Quando for espaço, ele separa 20px a esqueda e 1px a direita do input
            id("tenta"+(j-1)).style.margin = "0px 20px 0px 1px";
        }
    }
    sPalaSorteada = limpa(sPalavra);
    console.log(sPalavra+" - "+sPalaSorteada);
    //Exibe o tema e a quantidade de letras
    id("tema").innerHTML = asPerguntas[aiSorteados[iJogadas]][1]+" - "+
                           sPalaSorteada.length+" letras";
}

function cria(){
    //Insere os numeros squenciais dentro do vetor aiSorteados, conforme
    //a quantidade de perguntas existentes
    for(let i=0;i<asPerguntas.length;i++){
        aiSorteados.push(i);
    }
    //faz a mistura do aiSorteados 
    aiSorteados=shuffleArray(aiSorteados);
    //chama a função para criar os inputs das letras 
    criaLetras(asPerguntas[aiSorteados[iJogadas]][0]);
    //chamando o monta teclado para crias as primeiras teclas
                //quais teclas / id no html
    montaTeclado(acTeclas1, "teclado1");
    montaTeclado(acTeclas2, "teclado2");
    montaTeclado(acTeclas3, "teclado3");
}

function montaTeclado(acLetras, sId) {
    let sIdTeclado = document.getElementById(sId);
    for (let i = 0; i < acLetras.length; i++) {
        let btnLetra = document.createElement("input");
        btnLetra.setAttribute("type", "button");
        btnLetra.setAttribute("id", acLetras[i]);
        btnLetra.setAttribute("value", acLetras[i]);
        btnLetra.setAttribute("class", "teclado");
        sIdTeclado.appendChild(btnLetra);

        let btn = document.getElementById(acLetras[i]);
        btn.addEventListener("mousedown", function () {confere(btn.value);});
        btn.addEventListener("mouseup", function () {acabou();});
    }

}

function confere(cLetra){
    cLetraClicada = cLetra;
    let lAchou = false;
    for(let i=0;i<sPalaSorteada.length;i++){
        if(cLetra==sPalaSorteada.charAt(i)){
            id("tenta"+i).value=cLetra;
            iAcertos++;
            id("acertos").innerHTML = "ACERTOS: " + iAcertos;
            lAchou = true;
        }
    }
    if(lAchou==false){
        iErro++;
        id("imagens").src="images/forca"+(iErro+1)+".png";
    }
}

function acabou(){
    let lAcabou=false;
    if(iAcertos==sPalaSorteada.length){
        lAcabou=true;
        alert("Parabéns, você conseguiu!!")
        iCertas++;
    }else if(iErro==6){
        lAcabou=true;
        alert("Você perdeu!!");
        iErradas++
    }
    id(cLetraClicada).disabled=true;
    if(lAcabou){
        for(let i=0;i<sPalaSorteada.length;i++){
            id("tenta"+i).remove();
        }
    iJogadas++
    id("palcerta").innerHTML="PALAVRAS CERTAS: "+iCertas+"<br>PALAVRAS ERRADAS: "+ iErradas;
    criaLetras(asPerguntas[aiSorteados[iJogadas]][0]);
    iAcertos = 0;
    iErro = 0;
    id("acertos").innerHTML="ACERTOS: "+iAcertos;
    id("imagens").src="images/forca1.png";
    for(let i=0;i<asLetras.length;i++){
        id(asLetras[i]).disabled = false;
    }
    }
}

function limpa(sPalavra){
    let sResultado = sPalavra;
   sResultado = sResultado.replace(/( )+/g,'');
   sResultado = sResultado.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
   return sResultado;

}

function id(sId){
    return document.getElementById(sId);
}

function shuffleArray(aArray){
    for(let i=aArray.length-1;i>0;i--){
        let iSort = Math.floor(Math.random() * (i+1));
        let iTemp = aArray[i];
        aArray[i] = aArray[iSort];
        aArray[iSort]=iTemp;
    }
    return aArray;
}