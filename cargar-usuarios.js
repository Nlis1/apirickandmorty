
const listarUsuarios = document.getElementById("listar-usuarios");
const name = document.getElementById("name");
const status = document.getElementById("status");
const gender = document.getElementById("gender");
const species = document.getElementById("species");
const image = document.getElementById("image");
const indice = document.getElementById("indice")
const id = document.getElementById("id")
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar")
const btnSiguiente = document.getElementById("btn-siguiente")
const btnAtras = document.getElementById("btn-atras")
const menu = document.getElementById("menu")

let pagination = null;
let usuarios = [];


function render(){
    const Usuariosrender = usuarios.map((usuario,indice) =>  `
        <div class="col">
         <div class="card">
            <div class="card-body">
               <h5 class="card-title">${usuario.name}</h5>
                 <img src="${usuario.image}" alt="">
               <ul>
                    <li>${usuario.status}</li>               
                    <li>${usuario.species}</li>               
                    <li>${usuario.gender}</li> 
                                              
               </ul>
                 <a href="index2.html?usuario=${usuario.id}" class="btn btn-primary">Ver</a>
                 <button type="button" class="btn btn-info editar" data-bs-target="#exampleModal" data-bs-toggle="modal" onclick="editar(${indice})">Editar</button>
                 <button href="#" class="btn btn-danger eliminar" onclick="eliminar(${usuario.id})">Eliminar</button>
             </div>
           </div>
   </div>`
  ).join("");
   listarUsuarios.innerHTML = Usuariosrender;
}


function listar(url){
  obtener(url).then(data => {
     setDataAndValidate(data)
     console.log(data)

    for (let i = 1 ; i <= pagination.pages; i++) {
        menu.innerHTML += `<button type="button"  onclick="clickBoton(${i})" class="btn btn-primary" id="btn-siguiente">${i}</button>`
    }
  })
}

 function clickBoton(i){
   obtener(`https://rickandmortyapi.com/api/character?page=${i}`)
    .then((data) => {
      setDataAndValidate(data)
    })
}

 function siguiente(){
   obtener(pagination.next)
    .then((data) => {
      setDataAndValidate(data)
    }) 
}

function setDataAndValidate(data){
  usuarios = data.results
  pagination = data.info
  render()

  if(pagination.prev){
      btnAtras.style.display = "block"
  }else{
    btnAtras.style.display = "none"
  }

  if(pagination.next){
      btnSiguiente.style.display = "block"
  }else{
      btnSiguiente.style.display = "none"
  }
}

 function atras(){
  obtener(pagination.prev)
  .then((data) => {
    setDataAndValidate(data)
  })
}


function crearUsuario(e){
    e.preventDefault();
    const datos = {
      id: parseInt(id.value),
      name: name.value,
      status: status.value,
      gender: gender.value,
      species: species.value,
      image: image.value,
    }
    const accion =  btnGuardar.innerHTML;
    if(accion === "Editar"){
      usuarios[indice.value] = datos
      
    }else{
      usuarios.unshift(datos);
    }
    render();
    limpiar();
}

function editar(index){
 btnGuardar.innerHTML="Editar";
 const usuario = usuarios[index];
 name.value = usuario.name;
 status.value = usuario.status;
 gender.value = usuario.gender;
 species.value = usuario.species;
 image.value = usuario.image;
 indice.value = index
 id.value= usuario.id
}


function limpiar(){
  name.value= "";
  status.value= "";
  gender.value= "";
  species.value= "";
  image.value= "";
  id.value= "";
  btnGuardar.innerHTML ="Crear"
}

function eliminar(id){
  console.log(id)
      usuarios =  usuarios.filter((usuario) => usuario.id !== id)
      console.log(usuarios)
      render()
  }


listar('https://rickandmortyapi.com/api/character?page=1');

form.onsubmit = crearUsuario; 
btnGuardar.onclick = crearUsuario;
