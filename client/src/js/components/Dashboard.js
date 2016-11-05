import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, RadialBarChart, RadialBar } from "recharts";

export default class Dashboard extends React.Component {


  render() {

     var lineData = [];
     var pieData1 = [];
     var pieData2 = [];
     var radialData = [];
     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#a4de6c', '#d0ed57'];
     var resultados = this.props.results;
     for(var result in resultados){
       switch (resultados[result].type){
         case "prices":
            for(var item in resultados[result].stats){
              lineData.push({name: resultados[result].stats[item].Item, uv: resultados[result].stats[item].price, pv: resultados[result].stats[item].sold})
            }
         break;
         case "condition":
            pieData1.push({name: 'Nuevo', value: resultados[result].stats.Nuevo, fill: '#8884d8'}, {name: 'Usado', value: resultados[result].stats.Usado, fill: '#ffc658'})
         break;
         case "shipping":
            pieData2.push({name: 'Si', value: resultados[result].stats.Si, fill: '#a4de6c'}, {name: 'No', value: resultados[result].stats.No, fill: '#d0ed57'})
         break;
         case "address":
            var i = 0;
            for(var item in resultados[result].stats){
              radialData.push({name: item, uv: resultados[result].stats[item], fill: COLORS[i]})
              i ++;
            }
         break;
       }
     }
    const style = {
    	top: 0,
    	left: 350,
    	lineHeight: '24px'
    };


    return (
      <div class="col-md-8 main">
        <h4>Busqueda: <strong>{this.props.selectedQuery}</strong></h4>

        <div class="panel panel-default">
            <div class="panel-heading">Cantidad de Unidades Disponibles vs Unidades vendidas</div>
            <div class="panel-body">
            <LineChart width={600} height={300} data={lineData}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="name"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Nuevos vs Usados</div>
            <div class="panel-body">
              <PieChart width={800} height={400}>
                <Pie isAnimationActive={false} data={pieData1} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                <Tooltip/>
               </PieChart>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Envío Gratis</div>
            <div class="panel-body">
              <PieChart width={800} height={400}>
                <Pie isAnimationActive={false} data={pieData2} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                <Tooltip/>
               </PieChart>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">Item por localidad</div>
            <div class="panel-body">
            <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={radialData}>
            <RadialBar minAngle={15} label background clockWise={true} dataKey='uv'/>
            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
            </RadialBarChart>
            </div>
        </div>

      </div>
    );
  }
}
