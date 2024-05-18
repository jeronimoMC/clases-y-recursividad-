class Cliente {
    constructor(tipo, necesitaAsesoria, transaccion = null) {
        this.tipo = tipo; // 'preferencial', 'general', 'noCuenta'
        this.necesitaAsesoria = necesitaAsesoria; // true o false
        this.transaccion = transaccion; // 'deposito', 'retiro' o null
    }
}

// Definición de la clase Caja
class Caja {
    constructor(id, tipo) {
        this.id = id;
        this.tipo = tipo; // 'retiro', 'general', 'asesoria'
        this.ocupado = false;
    }

    atenderCliente(cliente) {
        this.ocupado = true;
        console.log(`Atendiendo cliente ${cliente.tipo} en caja ${this.id} para ${cliente.necesitaAsesoria ? 'asesoría' : cliente.transaccion}`);
        setTimeout(() => {
            this.ocupado = false;
            console.log(`Caja ${this.id} está libre`);
        }, 3000); // Simula el tiempo de atención
    }
}

// Definición de la clase Banco
class Banco {
    constructor() {
        this.cajas = [
            new Caja(1, 'retiro'),
            new Caja(2, 'retiro'),
            new Caja(3, 'general'),
            new Caja(4, 'general'),
            new Caja(5, 'asesoria')
        ];
        this.colas = {
            preferencial: [],
            general: [],
            noCuenta: [],
            asesorias: []
        };
    }

    agregarCliente(cliente) {
        if (cliente.necesitaAsesoria) {
            this.colas.asesorias.push(cliente);
        } else {
            this.colas[cliente.tipo].push(cliente);
        }
        this.asignarCajas();
    }

    asignarCajas() {
        this.cajas.forEach(caja => {
            if (!caja.ocupado) {
                let cliente = null;
                if (caja.tipo === 'asesoria') {
                    cliente = this.colas.asesorias.shift();
                } else if (caja.tipo === 'retiro') {
                    cliente = this.colas.preferencial.find(cli => cli.transaccion === 'retiro') ||
                              this.colas.general.find(cli => cli.transaccion === 'retiro') ||
                              this.colas.noCuenta.find(cli => cli.transaccion === 'retiro');
                } else {
                    cliente = this.colas.preferencial.shift() ||
                              this.colas.general.shift() ||
                              this.colas.noCuenta.shift();
                }
                
                if (cliente) {
                    caja.atenderCliente(cliente);
                }
            }
        });
    }
}

// Simulación de clientes
const banco = new Banco();

const clientes = [
    new Cliente('preferencial', false, 'retiro'),
    new Cliente('general', false, 'deposito'),
    new Cliente('noCuenta', true),
    new Cliente('preferencial', false, 'deposito'),
    new Cliente('general', true)
];

// Agregar clientes al banco
clientes.forEach(cliente => banco.agregarCliente(cliente));

// Simular llegada de más clientes con un intervalo de tiempo
setTimeout(() => banco.agregarCliente(new Cliente('noCuenta', false, 'retiro')), 5000);
setTimeout(() => banco.agregarCliente(new Cliente('preferencial', true)), 7000);