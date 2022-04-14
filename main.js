    //Se crean los arrays principales
    let listaProductos   = new Array();
    let elementosCarrito = new Array();

    let divProductos = document.getElementById('divProductos')
    fetch('./json/productos.json')
    .then(promesa => promesa.json())
    .then(listaProductosJSON => {
        listaProductosJSON.forEach((prodArr, indice) =>{
            let producto = new Producto(listaProductos.length,prodArr.nombre,prodArr.precio,prodArr.stock,prodArr.descripcion,prodArr.img,prodArr.alt)
            listaProductos.push(producto)
            divProductos.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4" id="producto${indice}>
                <div class="card border-0" ">
                    <img src="assets/img/${producto.img}" class="card-img-top card-img-fit" alt="${producto.alt}">
                    <div class="card-body text-center">
                        <h3 class="card-title texto-color">${producto.nombre} $${producto.precio}</h3>
                        <p class="card-text texto-color ">${producto.descripcion} (Stock: ${producto.stock})</p>
                        <input type="number" class="contador" name="cantidad" min="1" value="1" producto_id="${indice}" max="${producto.stock}" >
                        <button class="btn-agregar btn btn-color w-100 text-center" producto_id="${indice}">Agregar <i class="fas fa-shopping-cart"></i></button>
                        <button class="btn-quitar btn btn-color w-100 text-center d-none" producto_id="${indice}">Quitar</i></button>
                    </div>
                </div>
            </div>`
            //Se declaran los botones Agregar y se les asigna un evento click, ademas de un alert que indica la operacion realizada  
            let botonesAgregar = document.getElementsByClassName('btn-agregar');
            for(let i = 0; i < botonesAgregar.length; i++) {
                botonesAgregar[i].addEventListener('click', (evento) =>{
                    let producto_id = evento.currentTarget.getAttribute('producto_id') 
                    agregarAlCarrito(producto_id)
                    Swal.fire({
                        position: 'top-end',
                        title: 'Producto agregado',
                        showConfirmButton: false,
                        timer: 750
                    })
                }
            )}
            //Se declaran los botones Quitar y se les asigna un evento click, ademas de un alert que indica la operacion realizada   
            let botonesQuitar = document.getElementsByClassName('btn-quitar');
            for(let i = 0; i < botonesQuitar.length; i++) {
                botonesQuitar[i].addEventListener('click', (evento) =>{
                    let producto_id = evento.currentTarget.getAttribute('producto_id') 
                    quitarDelCarrito(producto_id)
                    Swal.fire({
                        position: 'top-end',
                        icon: '',
                        title: 'Producto eliminado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
    })
