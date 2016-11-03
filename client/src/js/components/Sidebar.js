import React from "react";



export default class Sidebar extends React.Component {

  handleChange(title) {
    this.props.changeQuery(title);
  }


  handleQuery(e){
    e.preventDefault();
    var query = document.getElementById('queryInput').value;
    this.props.newQuery(query);
    document.getElementById('queryInput').value = '';
  }

  render() {
    const mapQueries = this.props.queries.map(item => <li key={item._id} onClick={this.handleChange.bind(this, item.query)} ><a href="#" >{item.query}</a></li>);
    return (
      <div class="col-md-4">
          <ul class="nav nav-sidebar">
              <li class="active"><p>Mis búsquedas</p></li>
              <ul>{mapQueries}</ul>
          </ul>
          <form onSubmit={this.handleQuery.bind(this)}>
          <input id="queryInput" name="queryInput" />
          <input type="submit" value="Nueva" />
          </form>
      </div>
    );
  }
}
