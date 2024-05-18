const prompt = require('prompt-sync')();

// Clase base Producto
class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidadBodega = cantidadBodega;
        this.cantidadMinima = cantidadMinima;
        this.cantidadMaxima = cantidadMaxima;
        this.porcentajeDescuento = porcentajeDescuento;
    }

    solicitarPedido() {
        return this.cantidadBodega < this.cantidadMinima;
    }

    calcularTotalAPagar(cantidadCompra) {
        let total = this.precioCompra * cantidadCompra;
        let descuento = total * (this.porcentajeDescuento / 100);
        return total - descuento;
    }
}

// Subclase PrendaDeVestir
class PrendaDeVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento);
        this.talla = talla;
        this.permitePlanchado = permitePlanchado;
    }
}

// Subclase Calzado
class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento);
        this.talla = talla;
    }
}

// Función para crear productos de tipo PrendaDeVestir
function crearPrendasDeVestir(num) {
    let prendas = [];
    for (let i = 0; i < num; i++) {
        let codigo = prompt(`Ingrese el código de la prenda ${i + 1}: `);
        let descripcion = prompt(`Ingrese la descripción de la prenda ${i + 1}: `);
        let precioCompra = parseFloat(prompt(`Ingrese el precio de compra de la prenda ${i + 1}: `));
        let precioVenta = parseFloat(prompt(`Ingrese el precio de venta de la prenda ${i + 1}: `));
        let cantidadBodega = parseInt(prompt(`Ingrese la cantidad en bodega de la prenda ${i + 1}: `));
        let cantidadMinima = parseInt(prompt(`Ingrese la cantidad mínima requerida en bodega de la prenda ${i + 1}: `));
        let cantidadMaxima = parseInt(prompt(`Ingrese la cantidad máxima permitida de la prenda ${i + 1}: `));
        let porcentajeDescuento = parseFloat(prompt(`Ingrese el porcentaje de descuento de la prenda ${i + 1}: `));
        let talla = prompt(`Ingrese la talla de la prenda ${i + 1} (S, M, L, etc.): `);
        let permitePlanchado = prompt(`¿Permite planchado la prenda ${i + 1} (si/no)? `) === 'si';

        let prenda = new PrendaDeVestir(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla, permitePlanchado);
        prendas.push(prenda);
    }
    return prendas;
}

// Función para crear productos de tipo Calzado
function crearCalzados(num) {
    let calzados = [];
    for (let i = 0; i < num; i++) {
        let codigo = prompt(`Ingrese el código del calzado ${i + 1}: `);
        let descripcion = prompt(`Ingrese la descripción del calzado ${i + 1}: `);
        let precioCompra = parseFloat(prompt(`Ingrese el precio de compra del calzado ${i + 1}: `));
        let precioVenta = parseFloat(prompt(`Ingrese el precio de venta del calzado ${i + 1}: `));
        let cantidadBodega = parseInt(prompt(`Ingrese la cantidad en bodega del calzado ${i + 1}: `));
        let cantidadMinima = parseInt(prompt(`Ingrese la cantidad mínima requerida en bodega del calzado ${i + 1}: `));
        let cantidadMaxima = parseInt(prompt(`Ingrese la cantidad máxima permitida del calzado ${i + 1}: `));
        let porcentajeDescuento = parseFloat(prompt(`Ingrese el porcentaje de descuento del calzado ${i + 1}: `));
        let talla = parseInt(prompt(`Ingrese la talla del calzado ${i + 1}: `));

        let calzado = new Calzado(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla);
        calzados.push(calzado);
    }
    return calzados;
}

// Programa principal
let numPrendas = parseInt(prompt('Ingrese el número de productos de tipo prendas de vestir a manejar: '));
let numCalzados = parseInt(prompt('Ingrese el número de productos de tipo calzado a manejar: '));

let prendas = crearPrendasDeVestir(numPrendas);
let calzados = crearCalzados(numCalzados);

console.log('Productos de prendas de vestir:');
console.log(prendas);

console.log('Productos de calzado:');
console.log(calzados);