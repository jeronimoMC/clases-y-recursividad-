class usuario {
    constructor(nombre, tipo){
        this.nombre = nombre;
        this.tipo = tipo;
    }
}

class estudiante extends usuario {
    constructor(nombre){
        super(nombre, "estudiante");
    }
}

class docente extends usuario{
    constructor(nombre){
        super(nombre, "docente");
    }
}

class moduloAtencion {
    constructor(nombre){
        this.nombre = nombre;
        this.usuariosAtendidos =[];
    }

    atenderUsuarios(usuario){
        this.usuariosAtendidos.push(usuario);
    }
    
    transferirUsuario(usuario, moduloDestino){
        const index = this.usuariosAtendidos.indexOf(usuario)

        
        if (index > -1){
            this.usuariosAtendidos.splice(idex, 1);
            moduloDestino.atenderUsuarios(usuario)
        }
    }

    estadisticas(){
        let estudiantes = 0;
        let docentes = 0;

        this.usuariosAtendidos.forEach(usuario => {
            if (usuario.tipo === 'estudiante'){
                estudiantes++;
            } else if (usuario.tipo === 'Docente'){
                docente++;
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

class terminal extends moduloAtencion {
    constructor() {
        super('terminal');
    }
}

class Oficina extends moduloAtencion {
    constructor() {
        super('oficina');
    }
}

class Estadisticas {
    constructor(){
        this.modulos = [];
    }
agregarModulo(){
    this.modulos.modulos.push(modulo);
    }
    generarEsgtadisticas(){
        return this.modulos.map(modulo => modulo.getEstadisticas())
    }
}
 
const terminal =new terminal()
const oficina = new Oficina()
const estadisticas = new Estadisticas()
estadisticas.agregarModulo(terminal)
estadisticas.agregarModulo(oficina)
const estudiante1 = new estudiante('jeronimo')
const docente1 = new docente('Arle')
terminal.atenderUsuario(estudiante1);
oficina.atenderUsuario(docente1);

terminal.transferirUsuario(estudiante1, oficina);

console.log(estadisticas.generarEsgtadisticas());


