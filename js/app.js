const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
window.onload= ()=>{
        formulario.addEventListener("submit",validarFormulario);

}

function buscarImagenes(terminoBusqueda) {
    const url =`https://pixabay.com/api/?key=30343357-b2dc38a7a6981786cece4ced4&q=${terminoBusqueda}`
    fetch(url)
        .then((response)=> response.json())
        .then((data)=>imprimirHTML(data))
        .catch(error=>console.log(error))


}

function imprimirHTML(data){
    if(data.hits.length === 0){
        setTimeout(()=> {
            mostrarAlerta("No hay resultados")
        }, 10)
    }


    resultado.innerHTML = "" //limpiar el html
    data.hits.forEach((imagen)=>{
        const {previewURL,likes,views,largeImageURL}=imagen
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">
                <div class="p-4">
                    <p class="font-bold">${likes} <span class="font-light">Me Gusta</span></p>
                    <p class="font-bold">${views} <span class="font-light">Veces Vista</span></p>
                    <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                </div>
            </div>
        </div>
        `
    }
    )

}



function validarFormulario(e){
    e.preventDefault()
    const terminoBusqueda = document.querySelector("#termino").value
    if(terminoBusqueda === "") {
        setTimeout(()=> {
            mostrarAlerta("Agrega un termino de busqueda")
        },1000)
    return;
    }
    buscarImagenes(terminoBusqueda)


}

function mostrarAlerta(mensaje){
    const alerta= document.createElement("p")

    alerta.classList.add('bg-red-100','border-red-400','text-red-700',
        'px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center')
    alerta.innerHTML =`
    <string class="font-bold">Error!</string>
    <span class="block sm:inline">${mensaje}</span>
    `;
    formulario.appendChild(alerta)
    setTimeout(()=>{
        alerta.remove()
    },3000)


}