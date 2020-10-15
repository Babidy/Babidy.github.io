//create map
const map = L.map("mapid").setView([-27.222633, -49.6455874], 15)

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

//create icon
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58,68],
  iconAnchor: [29,58]
})

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon marker
    marker && map.removeLayer(marker)


    // add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)

})


// adicionar campo de fotos
function addPhotoField(){
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
   
    // pegar o container para duplicas .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
   
    // realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
  
    // verificar se o campo esta vazio, se sim, nao adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    if(input.value == "") {
      return
    }
    // limpar o campo antes de adicionar ao container de imagens
    newFieldContainer.children[0].value = ""

    // adicionar o clone ao container de imagens
    container.appendChild(newFieldContainer)
}


function deleteField(event){
  const span = event.currentTarget
  const fieldsContainer = document.querySelectorAll('.new-upload')

  if(fieldsContainer.length <= 1){
  // limpar o valor do campo
    span.parentNode.children[0].value = ""
    return
  }

  // deletar o campo
  span.parentNode.remove()
}

// selecionar sim ou nao
function toggleSelect(event){
    // retirar class .active dos botoes
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
      button.classList.remove('active')
     })
  // pegar o botao clicado
     const button = event.currentTarget
     button.classList.add('active')

  // atualizar input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]')

  // colocar a class .active no botao selecionado
  input.value = button.dataset.value

}
