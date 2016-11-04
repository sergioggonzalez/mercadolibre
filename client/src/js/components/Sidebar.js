import React from "react";



export default class Sidebar extends React.Component {

  handleChange(title) {
    this.props.changeQuery(title);
  }


  handleQuery(e){
    e.preventDefault();
    var query = document.getElementById('queryInput').value;
    if (document.getElementById('editInput').value.length > 0){
        this.props.editQuery(document.getElementById('editInput').value, document.getElementById('queryInput').value);
    }else{
        this.props.newQuery(query);
    }
    document.getElementById('queryButton').value = 'agregar';
    document.getElementById('queryInput').value = '';
    document.getElementById('editInput').value = '';
  }

  handleEdit(id, query) {
    document.getElementById('queryButton').value = 'editar';
    document.getElementById('queryInput').value = query;
    document.getElementById('editInput').value = id;
  }

  handleRemove(id) {
    this.props.removeQuery(id);
  }

  render() {
    const mapQueries = this.props.queries.map(item => <li key={item._id} onClick={this.handleChange.bind(this, item.query)} ><a href="#" >{item.query}</a><span onClick={this.handleEdit.bind(this, item._id, item.query)} class="glyphicon glyphicon-edit"></span><span onClick={this.handleRemove.bind(this, item._id)} class="glyphicon glyphicon-trash"></span></li>);
    return (
      <div class="col-md-4">
          <ul class="nav nav-sidebar">
              <li class="active"><p>Mis búsquedas</p></li>
              <ul>{mapQueries}</ul>
          </ul>
          <form onSubmit={this.handleQuery.bind(this)}>
          <input id="queryInput" name="queryInput" />
          <input id="editInput" type="hidden" name="editInput" />
          <input id="queryButton" type="submit" value="agregar" />
          </form>
      </div>
    );
  }
}
