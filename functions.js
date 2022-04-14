//Se visualiza la actualizacion del icono carrito y llama a la funcion rellenarCarrito
function actualizarCarrito(){
    let divChart = document.getElementById('chart')
    if(0<elementosCarrito.length){
        divChart.classList.remove('d-none')
        document.getElementById('btn-comprar').classList.remove("d-none")
    } else {
        divChart.classList.add('d-none')
    }
    let numeroElementosCarrito = document.getElementById('numeroElementosCarrito')
    numeroElementosCarrito.innerHTML = elementosCarrito.length
    rellenarCarrito()
}
//Se recorre el array elementoCarrito y se modifica el modal para que sea visible. 
function rellenarCarrito(){
    let modalCarrito = document.getElementById('modalCarrito')
    let precioTotal  = 0
    modalCarrito.innerHTML = ''
    elementosCarrito.forEach((ec)=>{
        let precio      = ec.producto.precio * ec.cantidad
        modalCarrito.innerHTML += `
        <div class="card mb-2 row" id="producto${ec.producto.id}">
            <div class="row g-0 " >    
                <div class="col-md-4">
                    <img src="assets/img/${ec.producto.img}"" class="img-fluid rounded mt-2">
                </div>
                <div class="col-md-7">
                    <div class="card-body py-2">
                        <p class="mb-2">Producto: ${ec.producto.nombre}  </p>
                        <p class="mb-2">Cantidad: ${ec.cantidad}</p>
                        <p class="mb-2">Precio: $${precio}</p>                                                    
                    </div>
                </div>
                <div class="col-md-1 mt-2"><a id="boton1" class="btn btn-color btn-cesto-modal" producto_id="${ec.producto.id}"><i class="fas fa-trash"></i></a></div>
            </div>
        </div>`   
        precioTotal += precio
    })
    if(elementosCarrito.length == 0){
        modalCarrito.innerHTML = `
        <div class="card mb-2 row" style="">
            <h2 class="texto-color">Su carrito esta vacio</h2>
        </div>`
        document.getElementById('btn-comprar').classList.add("d-none")
    }
    modalCarrito.innerHTML += `
    <h3 class="texto-color">Precio total: $${precioTotal}</h3>
    `
    // Crea listeners para los cestos
    let botonesCesto = document.getElementsByClassName('btn-cesto-modal');
    for(let i = 0; i < botonesCesto.length; i++) {
        botonesCesto[i].addEventListener('click', (evento) =>{
            let producto_id = evento.currentTarget.getAttribute('producto_id') 
            quitarDelCarrito(producto_id)
        })
    }

}

function agregarAlCarrito(producto_id){
    //Muestra el boton quitar
    let botonesQuitar = document.getElementsByClassName('btn-quitar')
    for(let i=0; i < botonesQuitar.length; i++) {
        if(producto_id == botonesQuitar[i].getAttribute('producto_id')){
            botonesQuitar[i].classList.remove("d-none")
        }
    }

    //Oculta el boton agregar
    let botonesAgregar = document.getElementsByClassName('btn-agregar')
    for(let i=0; i < botonesAgregar.length; i++) {
        if(producto_id == botonesAgregar[i].getAttribute('producto_id')){
            botonesAgregar[i].classList.add("d-none")
        }
    }

    //Oculta el input de cantidad
    let cantidad   = 0
    let cantidades = document.getElementsByName('cantidad');
    for(let i=0; i < cantidades.length; i++) {
        if(producto_id == cantidades[i].getAttribute('producto_id')){
        cantidad = cantidades[i].value
        cantidades[i].classList.add("d-none")
        }
    }

    //Agrega el elemento al carrito
    let elementoCarrito = new ElementoCarrito(listaProductos[producto_id],cantidad)
    elementosCarrito.push(elementoCarrito)

    //Actualiza el icono
    actualizarCarrito()
}
function quitarDelCarrito(producto_id){
    //Muestra el boton agregar
    let botonesAgregar = document.getElementsByClassName('btn-agregar')
    for(let i=0; i < botonesAgregar.length; i++) {
        if(producto_id == botonesAgregar[i].getAttribute('producto_id')){
            botonesAgregar[i].classList.remove("d-none")
        }
    }

    //Muestra el input de cantidad
    let cantidades = document.getElementsByName('cantidad');
    for(let i=0; i < cantidades.length; i++) {                                        
        if(producto_id == cantidades[i].getAttribute('producto_id')){
            cantidades[i].classList.remove('d-none')
        }
    }

    // Oculta el boton quitar
    let botonesQuitar = document.getElementsByClassName('btn-quitar')
    for(let i=0; i < botonesQuitar.length; i++) {
        if(producto_id == botonesQuitar[i].getAttribute('producto_id')){
            botonesQuitar[i].classList.add("d-none")
        }
    }

    // Elimina el elemento del carrito
    elementosCarrito = elementosCarrito.filter(ec=>{
        return ec.producto.id != producto_id
    })
    
    //Actualiza el icono
    actualizarCarrito()
}