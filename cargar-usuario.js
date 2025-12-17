const listar_usuario = document.getElementById("listar-usuario")


let usuario = {};

function tomarIndiceUsuario(){
    return location.search.replace('?', '').split('=')[1];
}

function obtenerUnUsuario(){
  obtener(`https://rickandmortyapi.com/api/character/${tomarIndiceUsuario()}`).then((res) => {
    usuario = res
    render();
  })
}

function render(){
    const usuarioRender = ` 
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
             </div>
           </div>
   </div>`;
   console.log(usuarioRender)
   listar_usuario.innerHTML = usuarioRender;
}



obtenerUnUsuario();