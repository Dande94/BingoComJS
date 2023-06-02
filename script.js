let numeroSort = document.getElementById('numeroSort');
let btnSortear = document.getElementById('btnSortear');
let btnTravaInput = document.getElementById('btnTravaInput');
let btnReset = document.getElementById('btnReset');
let numeroCapturado;
let sorteados = [];
let sorteadosCrescente = [];
let ultimosSorteios = []
let areaUltimosSorteios  = document.getElementById('ultimosSorteiosInner');
let todosOsNumeros  = document.getElementById('todosOsNumeros');

//teste de  memoria 
// let memoriaSorteio = JSON.parse(localStorage.getItem('SorteioBingo'));
// let memoriaSorteioNumeroMaximo = JSON.parse(localStorage.getItem('NumeroMaximoSorteio'));
// sorteados = memoriaSorteio;
// numeroCapturado = memoriaSorteioNumeroMaximo;
//

//evento para capturar o numero que servirá de valor máximo do sorteio e travamento do número setado;
btnTravaInput.addEventListener('click',travarInput);
//fim do evento

//evento de sorteio e exibição do numero sorteado, ultimas numeros chamados, e plano geral do sorteio;
if(btnSortear.hasAttribute('disabled') == true){//verifica se o btn de srtear está habilitado;
    btnSortear.addEventListener('click',sorteio);
}
//fim sorteio

//reset página
btnReset.addEventListener('click',resetarPágina);
//

//memória
function salvarSorteio(){
    localStorage.setItem('NumeroMaximoSorteio',JSON.stringify(parseInt(numeroCapturado)));
    localStorage.setItem('SorteioBingo',JSON.stringify(sorteados));
}

//funções
function travarInput(){
    let numeroMaximo = document.getElementById('inputMaxNumero');    
    numeroCapturado = numeroMaximo.value;
    if( (numeroCapturado > 0) && (numeroCapturado.trim() !== "") && (!isNaN(numeroCapturado)) && (Number.isInteger(Number(numeroCapturado)))){
        // console.log("É numero");
        if(numeroMaximo.hasAttribute('readonly') !== true){
                numeroMaximo.setAttribute('readonly','');
                btnSortear.removeAttribute("disabled");
                return numeroCapturado;
            }
            // else{numeroMaximo.removeAttribute('readonly','');}
    }else{
        alert("Informe um numero(inteiro!)");//pede para informa um valor inteiro;
        resetarPágina();
    }
}

function sorteio(event){
    let numero = parseInt((Math.random()*numeroCapturado).toFixed(0));
    let numeroExiste = sorteados.some(function(item){
        return (item == numero)? true : false;
    })
    event.preventDefault();
    numeroSort.innerHTML= numero;
    //console.log(numeroExiste);
        
    if(numeroExiste == true || numero == 0){
        if(sorteados.length < numeroCapturado ){//bloqueia o btn sortear caso já tenha atigindo o valor máximo de numeros a serem sorteados;
            // console.log(sorteados.length);
            sorteio(event);
        }else{
            btnSortear.setAttribute("disabled","true");
            alert("Atingiu o valor máximo de números possiveis sortear!")
        }
    }else{
        
        sorteados.push(numero);
        // console.log(sorteados);
        
        ultimosSorteios = sorteados.slice(-6,-1);
        // console.log(ultimosSorteios);
        areaUltimosSorteios.innerHTML = "";
        for(let i = 0 ; i < ultimosSorteios.length; i++){
            var novoElemento = document.createElement("div"); // Cria um novo elemento div
            
            novoElemento.textContent = ultimosSorteios[i]; // Define o texto do elemento com base no valor do array
            
            novoElemento.classList.add("ultimasEsfera"); // Adiciona classes ao elemento
            
            areaUltimosSorteios.appendChild(novoElemento); // Adiciona o elemento ao corpo do documento ou outro elemento de destino
        }
        
        
        todosOsNumeros.innerHTML = "";
        sorteadosCrescente.push(numero);
        sorteadosCrescente.sort((a,b)=>a-b);
        // sorteados.sort();
        for(let j = 0 ; j < sorteadosCrescente.length; j++){
                var novoElemento = document.createElement("div"); // Cria um novo elemento div

                novoElemento.textContent = sorteadosCrescente[j]; // Define o texto do elemento com base no valor do array
                
                novoElemento.classList.add("ultimasEsfera","mini"); // Adiciona classes ao elemento
                
                todosOsNumeros.appendChild(novoElemento); // Adiciona o elemento ao corpo do documento ou outro elemento de destino
        }

    }
    // console.log(sorteados.sort());
    salvarSorteio();    
};

function resetarPágina(){
    localStorage.clear();
    numeroMaximo.removeAttribute('readonly','');
    location.reload();//recarrega a págia;
};
