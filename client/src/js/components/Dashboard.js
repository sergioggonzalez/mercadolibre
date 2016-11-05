import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, RadialBarChart, RadialBar } from "recharts";

export default class Dashboard extends React.Component {


  render() {


    const lineData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ];



      const pieData = [{name: 'Nuevo', value: 35, fill: '#8884d8'}, {name: 'Usado', value: 15, fill: '#ffc658'}];

      const radialData = [
      {name: '18-24', uv: 31.47, fill: '#8884d8'},
      {name: '25-29', uv: 26.69, fill: '#83a6ed'},
      {name: '30-34', uv: 15.69, fill: '#8dd1e1'},
      {name: '35-39', uv: 8.22, fill: '#82ca9d'},
      {name: '40-49', uv: 8.63, fill: '#a4de6c'},
      {name: '50+', uv: 2.63,  fill: '#d0ed57'},
      {name: 'unknow', uv: 6.67, fill: '#ffc658'}
    ];

  const style = {
  	top: 0,
  	left: 350,
  	lineHeight: '24px'
  };


    return (
      <div class="col-md-8 main">
        <h2 class="page-header">Dashboard</h2>
        <h4>Busqueda: <strong>{this.props.selectedQuery}</strong></h4>

        <div class="panel panel-default">
            <div class="panel-body">
            <LineChart width={600} height={300} data={lineData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="name"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5"/>
             <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2"/>
            </LineChart>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
              <PieChart width={800} height={400}>
                <Pie isAnimationActive={false} data={pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                <Tooltip/>
               </PieChart>
            </div>
        </div>
        <div class="panel panel-default">
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
