const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCPF = document.querySelector('#m-cpf')
const sTorre = document.querySelector('#m-torre')
const sBloco = document.querySelector('#m-bloco')
const sApartamento = document.querySelector('#m-apartamento')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCPF.value = itens[index].cpf
    sTorre.value = itens[index].torre
    sBloco.value = itens[index].bloco
    sApartamento.value = itens[index].apartamento
    id = index
  } else {
    sNome.value = ''
    sCPF.value = ''
    sTorre.value = ''
    sBloco.value = ''
    sApartamento.value = ''
   }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.torre}</td>
    <td>${item.bloco}</td>
    <td>${item.apartamento}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCPF.value == '' || sTorre.value == '' || sBloco.value == '' || sApartamento.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cpf = sPlaca.value
    itens[id].torre = sTag.value
    itens[id].bloco = sBloco.value
    itens[id].apartamento = sApartamento.value
  
  } else {
    itens.push({'nome': sNome.value, 'cpf': sCPF.value,'torre':sTorre.value, 'bloco':sBloco.value,'apartamento': sApartamento.value, })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
