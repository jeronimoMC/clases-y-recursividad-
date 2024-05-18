class estadisticas {
    constructor(reservas){
        this.reservas = reservas;
    }


generarReporte() {
    const reporte = this.reservas.map(reserva => ({
        nombre: reserva.nombre.nombre,
        pais: reserva.cliente.paisOrigen,
        personas: reserva.personas,
        periodo: reserva.periodo,
        mascota: reserva.aceptaMascotas
    }));

    const totalPersonas = this.reservas.reduce((total, reserva) => total += reserva.personas, 0)
    reporte.push({totalPersonas});
    return reporte;
    }
}

 module.exports = estadisticas;

 