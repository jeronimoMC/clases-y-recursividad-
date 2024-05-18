const Hotel = require('./Hotel');
const Cliente = require('./Cliente');

const hotel = new Hotel();

const cliente1 = new Cliente('Juan Pérez', 'México');
const cliente2 = new Cliente('Ana Gómez', 'España');

hotel.reservarHabitacion(cliente1, 'doble', false, 3, false, '2024-05-01 a 2024-05-05');
hotel.reservarHabitacion(cliente2, 'familiar', true, 5, true, '2024-05-02 a 2024-05-06');

console.log(hotel.generarEstadisticas());