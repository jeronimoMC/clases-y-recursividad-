// Clase base Usuario
class Usuario {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo; // 'Estudiante' o 'Docente'
    }
}

// Clases derivadas
class Estudiante extends Usuario {
    constructor(nombre) {
        super(nombre, 'Estudiante');
    }
}

class Docente extends Usuario {
    constructor(nombre) {
        super(nombre, 'Docente');
    }
}

// Clase ModuloAtencion
class ModuloAtencion {
    constructor(nombre) {
        this.nombre = nombre;
        this.usuariosAtendidos = [];
    }

    atenderUsuario(usuario) {
        this.usuariosAtendidos.push(usuario);
    }

    transferirUsuario(usuario, moduloDestino) {
        const index = this.usuariosAtendidos.indexOf(usuario);
        if (index > -1) {
            this.usuariosAtendidos.splice(index, 1);
            moduloDestino.atenderUsuario(usuario);
        }
    }

    getEstadisticas() {
        let estudiantes = 0;
        let docentes = 0;

        this.usuariosAtendidos.forEach(usuario => {
            if (usuario.tipo === 'Estudiante') {
                estudiantes++;
            } else if (usuario.tipo === 'Docente') {
                docentes++;
            }
        });

        return {
            modulo: this.nombre,
            total: this.usuariosAtendidos.length,
            estudiantes: estudiantes,
            docentes: docentes
        };
    }
}

// Clases derivadas de ModuloAtencion
class Terminal extends ModuloAtencion {
    constructor() {
        super('Terminal');
    }
}

class Oficina extends ModuloAtencion {
    constructor() {
        super('Oficina');
    }
}

// Clase para gestionar las estadísticas
class Estadisticas {
    constructor() {
        this.modulos = [];
    }

    agregarModulo(modulo) {
        this.modulos.push(modulo);
    }

    generarEstadisticas() {
        return this.modulos.map(modulo => modulo.getEstadisticas());
    }
}

// Ejemplo de uso

// Crear módulos de atención
const terminal = new Terminal();
const oficina = new Oficina();

// Crear la clase de estadísticas y agregar los módulos
const estadisticas = new Estadisticas();
estadisticas.agregarModulo(terminal);
estadisticas.agregarModulo(oficina);

// Crear usuarios
const estudiante1 = new Estudiante('Juan');
const docente1 = new Docente('Ana');

// Atender usuarios
terminal.atenderUsuario(estudiante1);
oficina.atenderUsuario(docente1);

// Transferir usuario
terminal.transferirUsuario(estudiante1, oficina);

// Generar estadísticas
console.log(estadisticas.generarEstadisticas());