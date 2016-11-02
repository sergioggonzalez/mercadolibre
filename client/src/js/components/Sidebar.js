import React from "react";


export default class Sidebar extends React.Component {
  render() {
    return (
      <div class="col-md-4">
          <ul class="nav nav-sidebar">
              <li class="active"><p>Mis búsquedas</p></li>
              <ul>{this.props.queries}</ul>
          </ul>
      </div>
    );
  }
}
