class ATM {
    constructor(banco) {
        this.banco = banco;
        this.encendido = false;
        this.clienteActual = null;
    }

    encender() {
        this.encendido = true;
        console.log("Cajero encendido.");
    }

    apagar() {
        this.encendido = false;
        console.log("Cajero apagado.");
    }

    insertarDocumento(documentoID) {
        this.clienteActual = this.banco.validarCliente(documentoID);
        if (this.clienteActual) {
            console.log("Documento aceptado. Por favor, ingrese su PIN.");
        } else {
            console.log("Documento no válido.");
        }
    }

    ingresarPIN(pin) {
        if (this.clienteActual) {
            let intentos = 0;
            while (intentos < 3) {
                if (this.banco.validarPIN(this.clienteActual, pin)) {
                    console.log("PIN correcto. Bienvenido.");
                    return true;
                } else {
                    intentos++;
                    console.log(`PIN incorrecto. Intento ${intentos} de 3.`);
                }
            }
            console.log("Demasiados intentos fallidos. Salida de la aplicación.");
            this.clienteActual = null;
            return false;
        } else {
            console.log("Por favor, inserte su documento de identidad primero.");
            return false;
        }
    }

    realizarTransaccion(tipo, ...params) {
        if (!this.encendido || !this.clienteActual) {
            console.log("El cajero no está disponible o no hay cliente autenticado.");
            return;
        }

        switch (tipo) {
            case 'retiro':
                this.retirarEfectivo(...params);
                break;
            case 'deposito':
                this.depositarDinero(...params);
                break;
            case 'transferencia':
                this.transferirDinero(...params);
                break;
            case 'consultaSaldo':
                this.consultarSaldo(...params);
                break;
            default:
                console.log("Transacción no válida.");
        }
    }

    retirarEfectivo(cuentaID, monto) {
        if (this.banco.retirarDinero(this.clienteActual, cuentaID, monto)) {
            console.log(`Retiro exitoso. Puede tomar ${monto} de la bandeja principal.`);
        } else {
            console.log("Retiro fallido. Fondos insuficientes o cuenta no válida.");
        }
    }

    depositarDinero(cuentaID, monto, tipo) {
        this.banco.depositarDinero(this.clienteActual, cuentaID, monto, tipo);
        console.log(`Depósito de ${monto} como ${tipo} exitoso.`);
    }

    transferirDinero(cuentaOrigenID, cuentaDestinoID, monto) {
        if (this.banco.transferirDinero(this.clienteActual, cuentaOrigenID, cuentaDestinoID, monto)) {
            console.log(`Transferencia de ${monto} de la cuenta ${cuentaOrigenID} a la cuenta ${cuentaDestinoID} exitosa.`);
        } else {
            console.log("Transferencia fallida. Fondos insuficientes o cuentas no válidas.");
        }
    }

    consultarSaldo(cuentaID) {
        const saldo = this.banco.consultarSaldo(this.clienteActual, cuentaID);
        console.log(`El saldo de la cuenta ${cuentaID} es ${saldo}.`);
    }
}

