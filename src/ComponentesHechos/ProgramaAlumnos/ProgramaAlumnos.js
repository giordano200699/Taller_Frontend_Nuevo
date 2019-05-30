/* App.js */

import React, { Component } from 'react';
import CanvasJSReact, {CanvasJS} from './../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ProgramaAlumnos extends Component {

    constructor(){//constructor inicial
        super();
        this.state = {
            isUsed:false, //usado para saber si las aplicacion es usada
            showPopover: false, //usado para mostrar o no el popup
            verdades : {}, //usado para  ver que conceptos estan sieno usados
            chartData : {}, //usado para dar datos al FusionChart (cuadro)
            isChartLoaded: true, //usado para mostrat el FusionChart
            tableData: {}, //usado para dar datos a la tabla
            isTableLoaded: false, //usado para mostrar la tabla
            conceptsData: {}, //usado para guardar los conceptos de la BD
            isConceptsLoaded: false, //usado para saber si ya obtuvimos los conceptos de la BD
            infoType : "importes", //usado para saber el tipo de informacion mostrada
            titulo: 'REPORTE ESTADISTICO DE IMPORTES POR CONCEPTO', //usado para el titulo del cuadro
            subtitulo: 'DEL 03/01/2015 AL 06/01/2015', //usado para el subtitulo del cuadro
            fechaInicio: '1420243200', //usado para la fecha inicial del cuadro
            fechaFin: '1420502400', //usado para la fecha final del cuadro
            grafico : 'column2d', //usado para el tipo de grafico del cuadro
            anioini : '2015', //usado para el año inicial del cuadro
            aniofin : '2015', //usado para el año final del cuadro
            anio: '2015', //usado para el año a biscar con el intervalo del mes
            mesini : '1', //usado para el mes inicial del cuadro
            mesfin : '12', //usado para el mes final del cuadro/grafico
            opcion : 'fecha', //usado para la opcion del filtro
            colores : "", //usado para el tipo de color del cuadro/grafico
            grad : "0", //usado para el gradiente del cuadro
            prefijo : "S/", //usado para el prefijo del cuadro
            listaConceptos : "", //usado para guardar una lista de los conceptos del cuadro
            todos : true, //usado para marcar todos los checkbox
            conceptos : [], //usado para saber que checkboxes son marcados
            todosConceptos : [], //usado para saber todos los conceptos que hay en la BD en otro tipo formato de dato
            usuario : '', //usado para la sesion del usuario
            listaConceptosEncontrados : "", //usado para saber que conceptos se encontraron en la consulta,
            data: {}
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();

    }


    miFuncion(){
        fetch('http://tallerbackend.herokuapp.com/ApiController/listaConceptos?fecha_inicio=2002&fecha_fin=2004')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            //console.log(result);
            this.setState({
                isChartLoaded : true,
                data: {
                    title: {
                        text: "Programa Alumnos"
                    },
                    data: [
                    {
                        // Change type to "doughnut", "line", "splineArea", etc.
                        type: "column",
                        dataPoints: [
                            { label: "DSI",  y: 38  },
                            { label: "GTIC", y: 41  },
                            { label: "ISW", y: 32  },
                            { label: "DGTI", y: 29  },
                            { label: "GIC",  y: 33  },
                            { label: "GTI",  y: 30  },
                            { label: "GPTI",  y: 46  },
                            { label: "ASTI",  y: 42  }
                        ]
                    },
                    {
                        // Change type to "doughnut", "line", "splineArea", etc.
                        type: "column",
                        dataPoints: [
                            { label: "DSI",  y: 17  },
                            { label: "GTIC", y: 22  },
                            { label: "ISW", y: 17  },
                            { label: "DGTI", y: 12  },
                            { label: "GIC",  y: 15  },
                            { label: "GTI",  y: 11  },
                            { label: "GPTI",  y: 28  },
                            { label: "ASTI",  y: 20  }
                        ]
                    },
                    {
                        // Change type to "doughnut", "line", "splineArea", etc.
                        type: "column",
                        dataPoints: [
                            { label: "DSI",  y: 9  },
                            { label: "GTIC", y: 11  },
                            { label: "ISW", y: 7  },
                            { label: "DGTI", y: 4  },
                            { label: "GIC",  y: 9  },
                            { label: "GTI",  y: 9  },
                            { label: "GPTI",  y: 7  },
                            { label: "ASTI",  y: 12  }
                        ]
                    }
                    ]
                }
            });
        })
    }

    render() {
        
        return (

        <div>
            <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
        </div>
        );
    }
}
export default ProgramaAlumnos;


/*

    { label: "DSI",  y: 0  },
    { label: "GTIC", y: 15  },
    { label: "ISW", y: 74  },
    { label: "DGTI", y: 74  },
    { label: "GIC",  y: 0  },
    { label: "GTI",  y: 0  },
    { label: "GPTI",  y: 0  },
    { label: "ASTI",  y: 0  }
*/