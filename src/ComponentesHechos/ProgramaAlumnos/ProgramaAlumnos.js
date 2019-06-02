/* App.js */

import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import CanvasJSReact, {CanvasJS} from './../../canvasjs.react';
import Parser from 'html-react-parser';
import Pdf from '../Pdf/pdf';
import html2canvas from 'html2canvas';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ProgramaAlumnos extends Component {

    constructor(props){//constructor inicial
        super(props);
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
            anioini : ''+this.props.anioIni, //usado para el año inicial del cuadro
            aniofin : ''+this.props.anioFin, //usado para el año final del cuadro
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
            data: {},
            miHtml: '',
            miHtml2:'',
            imagen: null,
            cargoImagen:false,
            miLeyenda: '',
            esVisible:false
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();

    }


    miFuncion(){
        fetch('http://tallerbackend.herokuapp.com/ApiController/programaAlumnos?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            var cadena = '';
            var cadena2 = '';

            let leyenda = '';

            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>DISI: DOCTORADO EN INGENIERIA DE SISTEMAS E INFORMATICA</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>GTIC: GESTION DE TECNOLOGIA DE INFORMACION Y COMUNICACIONES</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>ISW: INGENIERIA DE SOFTWARE</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>GIC: GESTION DE LA INFORMACION Y DEL CONOCIMIENTO</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>GTI: GOBIERNO DE TECNOLOGIAS DE INFORMACION</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>GPTI: GERENCIA DE PROYECTOS DE TECNOLOGIA DE INFORMACION</td></text></br>";            
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>ASTI: AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</td></text></br></br>";

            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>AC: Activo</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>G: Graduado</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>RM: Reserva</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>INAC: Inactivo</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>AI: Ingreso Anulado</td></text></br>";
            leyenda += "<text className='leyenda' style='font-size:12px'><tr><td>AC: Egresado</td></text>";

            for(var tipo in result){
                var contador = 1;
                
                for(var anio in result[tipo]){
                    if(contador==1){
                        cadena += '<tr><td style="vertical-align: middle;" rowspan="'+Object.keys(result[tipo]).length+'">'+tipo+'</td>';
                    }else{
                        cadena += '<tr>';
                    }
                     
                    cadena += '<td>'+anio+'</td>';
                    
                    for(var i = this.state.anioini;i<=this.state.aniofin;i++){
                        if(result[tipo][anio][i]){
                            cadena+='<td>'+result[tipo][anio][i]+'</td>';
                        }else{
                            cadena+='<td>0</td>';
                        }
                    }
                    cadena+='</tr>';
                    contador++;
                }
            }

            for(var i = this.state.anioini;i<=this.state.aniofin;i++){
                cadena2+='<th><h4>'+i+'</h4></th>';
            }

            //console.log(result);
            this.setState({
                isChartLoaded : true,
                miHtml:cadena2,
                miHtml2:cadena,
                miLeyenda: leyenda,
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

        if(this.props.anioFin!=this.state.aniofin || this.props.anioIni!=this.state.anioini){
            this.setState({
                aniofin: this.props.anioFin,
                anioini: this.props.anioIni
            },() => {
                this.miFuncion();
            });
        }

        const aI = this.props.anioIni;
        const aF = this.props.anioFin;
        
        return (

        <div>
            
            <Tabs align="center" >
                    <Tab label="Tabla">
                        <div class="panel row align-items-center">
                        <div className="panel-heading mt-3 mb-3">
                            <h5 className="titulo">LEYENDA: </h5>
                            {Parser(this.state.miLeyenda)} 
                            <hr></hr>
                            {aI == aF ? (<h4 className="titulo">Tabla de Datos - Población Estudiantil del año {this.props.anioIni}</h4>) : 
                            (<h4 className="titulo">Tabla de Datos - Población Estudiantil del {this.props.anioIni} al {this.props.anioFin}</h4>)}
                        </div>  
                            <table className="table table-bordered table-striped col-md-11 mr-md-auto greenTable">
                                <thead>
                                     
                                    <th> <h4>Programa</h4></th>
                                    <th><h4>Estado</h4></th>
                                    {Parser(this.state.miHtml)} 
                                    
                                </thead>
                                <tbody>
                                    {Parser(this.state.miHtml2)}                            
                                </tbody>
                            </table>          
                        </div>
                    </Tab>
                    <Tab label="Grafico">
                    <div class="panel row align-items-center">
                        <div class="panel-heading mt-3 mb-3">
                            <h4 class="panel-title titulo">Grafica de Población Estudiantil</h4>
                        </div>
                        <div class="panel-body col-md-11 mr-md-auto ml-md-auto">
                            <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                        </div>           
                    </div>
                    </Tab>

                    <Tab label="Visualizar PDF" >
                        <div className="panel row align-items-center" >
                            <div className="panel-heading mt-3 mb-3">
                                <h4 style={{marginLeft:60}} className="titulo titulo">Visualizar PDF</h4>
                            </div>
                            <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                                {this.state.cargoImagen?<Pdf imagen={this.state.imagen}></Pdf>:null}
                                
                            </div>           
                        </div>
                    </Tab>
                </Tabs>
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