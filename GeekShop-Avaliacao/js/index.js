 // tentei achar formas de localizar o momento do scroll com js puro, mas infelizmente não achei, e achei um código de acordo com oque eu queria neste link, espero que não tenha problema ter retirado de lá > "https://pt.stackoverflow.com/questions/291683/como-mostrar-e-esconder-elemento-de-acordo-com-scroll" //

$(document).ready( () => {     
  var backtop = $("#backtop");
  $(document).scroll( function() {
    var scroll = $(document).scrollTop();
    if(scroll > 100)  $("#backtop").css("display", "block");
    if(scroll < 160 ) $("#backtop").css("display", "none");
  });       
}); 

// Variaveis de Escopo Global // Variaveis de criação do carrinho
var Destinvalortotal = document.getElementById('valortotal')

// Variaveis de complemento e criação  do carrinho
var nameprodCLASS = document.getElementsByClassName('card-title')
var boxcarCLASS = document.getElementsByClassName('boxcarrinho')
var carrin = document.getElementById('carrinhoprod')

var indiceItem = 0
var precos = []
var itensvisiveis = []



function addcart(clicked_id){
 var SeparandoId = clicked_id.split("")
 localStorage.setItem('chave', SeparandoId)

 if(SeparandoId.length >= 3){
    var val = SeparandoId[1]+SeparandoId[2]
    var ItensSelecteds = parseFloat(val-1)
  }
else if(SeparandoId.length < 3){
    var ItensSelecteds =  parseFloat(SeparandoId[1]) - 1
}
  var nome = nameprodCLASS[ItensSelecteds].innerHTML
  var valorin = document.getElementsByClassName('valor')
  var valor = valorin[ItensSelecteds].innerHTML

  if(itensvisiveis.includes(ItensSelecteds))(
    alert('Já Adicionado')
  )
  else{
  carrin.innerHTML += `<div class="boxcarrinho" id="${indiceItem}">
  <label onclick="removeritem(this.id,this.name)" id="${indiceItem}" name="${ItensSelecteds}" class="removeitem"> Remove </label>
  <label class="nameproduto_saida">${nome}</label> 
  <p>R$<input type="number" id="valorrev${indiceItem}" class="valorrev" value="${valor}" readonly></p>
  </div>`


  itensvisiveis.push(ItensSelecteds)
  somar()
  itenscar.innerHTML++
  indiceItem++
  }
}

function somar(){
   var ValorSoma = parseFloat(document.getElementById(`valorrev${indiceItem}`).value)
   
  if(precos.includes(ValorSoma)){
    console.log("Produto ja foi adicionado")
  }else{ 
    precos.push(ValorSoma)
    const total = precos.reduce((total, currentElement) => total + currentElement)
    Destinvalortotal.innerHTML = total
  }
}

function removeritem(removeid){
  // Devido a um erro lógico que estava ocorrendo quando eu removia um indice e o tranformava em "0", tive que passar a o transformar em "a", para não atrapalhar o produto de indice 0 //
  precos.splice(removeid, 1, 0)
  var total = precos.reduce((total, currentElement) => total + currentElement)
  itensvisiveis.splice(removeid,1, "a")
  Destinvalortotal.innerHTML = total
  boxcarCLASS[removeid].innerHTML = ""
  itenscar.innerHTML--
}

  // Verificar Forma de Pagamento Escolhido (testando puxar elemento com jquery e edita-lo)
function verif_formapagamento(){
  var pagamento = document.getElementById('FormPagamento')
  var optionSelected = pagamento.options[pagamento.selectedIndex].value

  if(optionSelected == 'Cartão') { $('#info-pagamento').css('display', 'block') }
  else { $('#info-pagamento').css('display', 'none') } 
}

function somente_numero(e){
  var tecla = (window.event)?event.keyCode:e.which
  if(tecla >= 48 && tecla <= 57 || (tecla >= 96 && tecla <= 105) || tecla == 37 || tecla == 39 || tecla == 46 || tecla == 9 || tecla == 8){ return true }
}

function mascara(obj){
  if(obj.name == "cpf"){
   if(obj.value.length  == 3 || obj.value.length  == 7 || obj.value.length  == 11) {obj.value += "." }
}
else if(obj.name == "telefone"){
  if(obj.value.length  == 0){obj.value += "("}
  if(obj.value.length  == 3){obj.value += ")"}
  if(obj.value.length  == 8){obj.value += "-"}
}
else if(obj.name == "numerocartao"){
  if(obj.value.length == 4 || obj.value.length == 9 || obj.value.length == 15) {obj.value += " "}
 }
 else if(obj.name == "vencimento"){
   if(obj.value.length == 2){obj.value += "/"}
 }
} 
  // Variaveis e Função de Terminar o Pedido e Fazer toda a verificação / Verificar e Fazer Comentários.
var nomecliente = document.getElementById('nomecliente')
var sobrenome = document.getElementById('sobrenomecliente')
var email = document.getElementById('emailcliente')
var endereco = document.getElementById('enderecocliente')
var cpf = document.getElementById('cpf')
var telefone = document.getElementById('telefone')

function envpedido(){
  var valorrecebido = itensvisiveis.every(elem => elem == "a")

  if(valorrecebido == false && nomecliente.value.length > 3 && itensvisiveis.length >= 1 && sobrenome.value.length > 3 && email.value.length > 6 && endereco.value.length > 8 && cpf.value.length == 14 && telefone.value.length == 13){
    var FazComennt = document.getElementById("FazerComentario").style.display ="block"
    document.getElementById("comentarea").style.display = "block"
    document.getElementById('carrinho').style.display ="none"
    document.getElementById('spancarrinho').innerHTML = "Obrigado!"
    document.getElementById('BtReload').style.display = "block"
    document.getElementById('alertobrigado').style.display="block"
    itenscar.innerHTML = itenscar.innerHTML - itenscar.innerHTML
  }
  else{
    alert('Preencha os campos'),document.getElementById('nomecliente').focus()
  }
}

function FazerComentario(){
  var comentariosID = document.getElementById('comentarios')
  var comentario_cliente = document.getElementById('comentariocliente')

  if(comentario_cliente.value.length > 8 && nomecliente.value.length > 3){
  comentariosID.innerHTML += `<div class="col-lg-4 cl-md-6 col-sm-12">
  <div class="card comment">
    <div class="card-body">
      <h5 class="card-title">${nomecliente.value} ${sobrenome.value}</h5>
      <p class="card-text-comment"> ${comentario_cliente.value} </p>
    </div>
  </div>
  </div>`
  var FazComennt = document.getElementById("FazerComentario").style.display ="none"
  }
  else if(comentario_cliente.value.length < 8){
    alert('Comentário precisa ter mais de 8 caracteres')
  }
}

function Reload(){
  location.reload()
  window.scrollTo(0,0)
}