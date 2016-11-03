import React from "react";


export default class Sidebar extends React.Component {

  handleChange(title) {
    this.props.changeQuery(title);
  }

  render() {
    const mapQueries = this.props.queries.map(item => <li key={item._id} onClick={this.handleChange.bind(this, item.query)} ><a href="#" >{item.query}</a></li>);
    return (
      <div class="col-md-4">
          <ul class="nav nav-sidebar">
              <li class="active"><p>Mis búsquedas</p></li>
              <ul>{mapQueries}</ul>
          </ul>
          <input  onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
