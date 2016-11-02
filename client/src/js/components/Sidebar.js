import React from "react";


export default class Sidebar extends React.Component {

  render() {
    const mapQueries = this.props.queries.map(item => <li key={item._id}>{item.query}</li>);
    return (
      <div class="col-md-4">
          <ul class="nav nav-sidebar">
              <li class="active"><p>Mis búsquedas</p></li>
              <ul>{mapQueries}</ul>
          </ul>
      </div>
    );
  }
}
