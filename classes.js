//Se crean las clases necesarias
class Producto {
    constructor(id,nombre,precio,stock,descripcion,img,alt){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
        this.img = img;
        this.alt = alt;
    }
}
class ElementoCarrito {
    constructor(producto,cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}