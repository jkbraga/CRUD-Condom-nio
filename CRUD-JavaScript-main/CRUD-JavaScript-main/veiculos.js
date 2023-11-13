const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTipoVeículo = document.querySelector('#m-tipoVeículo')
const sAno = document.querySelector('#m-ano')
const sModelo = document.querySelector('#m-Modelo')
const sCor = document.querySelector('#m-Cor')
const sRenavam = document.querySelector('#m-Renavam')
const sPlaca = document.querySelector('#m-placa')
const sTag = document.querySelector('#m-tag')
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
    sTipoVeículo.value = itens[index].TipoVeículo
    sAno.value = itens[index].sAno
    sModelo.value = itens[index].Modelo
    sCor.value = itens[index].Cor
    sRenavam.value = itens[index].Renavam
    sPlaca.value = itens[index].placa
    sTag.value = itens[index].tag
    id = index
  } else {
    sTipoVeículo.value = ''
    sAno.value = ''
    sModelo.value = ''
    sCor.value = ''
    sRenavam.value = ''
    sPlaca.value = ''
    sTag.value = ''
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
    <td>${item.TipoVeículo}</td>
    <td>${item.sAno}</td>
    <td>${item.Modelo}</td>
    <td>${item.Cor}</td>
    <td>${item.Renavam}</td>
    <td>${item.placa}</td>
    <td>${item.tag}</td>
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
  
  if (sTipoVeículo.value == '' || sAno == '' || sModelo == '' || sCor == '' || sRenavam.value == '' || sPlaca.value == '' || sTag.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].TipoVeículo = sTipoVeículo.value
    itens[id].Placa = sAno.value
    itens[id].Modelo = sModelo.value
    itens[id].Cor = sCor.value
    itens[id].Renavam = sRenavam.value
    itens[id].placa = sPlaca.value
    itens[id].tag = sTag.value
  } else {
    itens.push({'TipoVeículo': sTipoVeículo.value, 'Placa':sAno.value, 'Modelo' : sModelo.value, 'Cor': sCor.value, 'Renavam': sRenavam.value, 'placa': sPlaca.value, 'tag':sTag.value})
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
