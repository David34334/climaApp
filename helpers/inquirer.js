/* Manejo de consola (UI) a través de la libreria Inquirer */
const Inquirer = require('inquirer');
/* Agregar colores a la consola */
require('colors');

/* Menú de opciones */
const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Bienvenido/a. ¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: '2',
                name: `${'2.'.green} Historial de búsqueda`
            },
            {
                value: '0',
                name: `0. Salir`.red
            }
        ]
    }
]

/* Pausar la consola a espera de intervención del usuario */
const pauseConsoleMenu = [
    {
        type: 'input',
        name: 'pause',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]

/* Menú principal */
const inquirerMenu = async () => {
    /* Limpieza de consola */
    console.clear();
    /* Parte inicial del menú */
    console.log('**************************************'.green);
    console.log('*************WEATHER APP**************'.bgGreen);
    console.log('**************************************'.green);
    /* Mostrar el menú creado anteriormente y obtener la opción seleccionada por el usuario */
    const { option } = await Inquirer.prompt(menuOptions);
    /* Se retorna la opción seleccionada por el usuario */
    return option;
}

/* Función pausar consola */
const pauseConsoleFunction = async () => {
    console.log('\n');
    const { pause } = await Inquirer.prompt(pauseConsoleMenu);
    return pause;
}

/* Leer entradas del usuario en consola a partir de un mensaje  */
const readAnswersByUserInConsole = async ( message = '' ) => {
    /* Lectura de una entrada por parte del usuario en consola */
    const inputByUserMenu = [
        {
            type: 'input',
            name: 'input',
            message,
            validate(value) {
                if (value.length === 0) return '¡Debe ingresar un valor para cotinuar!'.red;
                return true;
            }
        }
    ];

    const { input } = await Inquirer.prompt(inputByUserMenu);
    return input;
}

/* Listar productos para eliminar */
const listPlaces = async ( places = [] ) => {
    const choices = places.map( ( place, i ) => {
        const idx = `${i + 1}`.green;
        return {
            value: place.id,
            name : `${idx}. ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Salir'.red
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona el lugar que corresponde con tu búsqueda: '.cyan,
            choices
        }
    ]

    const { id } = await Inquirer.prompt( questions );
    return id;
}

/* Confirmar en consola por parte del usuario */
const confirm = async ( message = '' ) => {
    const confirmToUser = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await Inquirer.prompt( confirmToUser );
    return ok;
}


module.exports = { pauseConsoleFunction, inquirerMenu, readAnswersByUserInConsole, confirm, listPlaces }