import React from "react";


export default class Dashboard extends React.Component {
  render() {
    return (
      <div class="col-md-8 main">
        <h2 class="page-header">Dashboard</h2>
        <h4>Busqueda: <strong>{this.props.selectedQuery}</strong></h4>
      </div>
    );
  }
}
