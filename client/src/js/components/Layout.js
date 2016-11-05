import React from "react"
import { connect } from "react-redux"
import { fetchQueries, addQuery, updateQuery, deleteQuery } from "../actions/queriesActions"
import { fetchData } from "../actions/dataActions"

import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

@connect((store) => {
  return {
    queries: store.queries.queries,
    data: store.data.data,
  };
})
export default class Layout extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedQuery: "iphone",
      };

    }

  changeQuery(selectedQuery) {
    this.setState({selectedQuery});
    this.props.dispatch(fetchData(selectedQuery));
  }

  newQuery(newQuery) {
    this.props.dispatch(addQuery(newQuery, '001'));
  }

  editQuery(id, query) {
    this.props.dispatch(updateQuery(id, query, '001'));
  }

  removeQuery(id) {
    this.props.dispatch(deleteQuery(id));
  }

  componentWillMount() {
    this.props.dispatch(fetchQueries('001'));
    this.props.dispatch(fetchData(this.state.selectedQuery));
  }

  render() {
    const { queries, data } = this.props;
    var results = data.results;
    return  <div>
                <Nav />
                <div class="container-fluid">
                    <div class="row">
                        <Sidebar
                            newQuery={this.newQuery.bind(this)}
                            editQuery={this.editQuery.bind(this)}
                            removeQuery={this.removeQuery.bind(this)}
                            changeQuery={this.changeQuery.bind(this)}
                            queries={ queries }
                          />
                        <Dashboard
                        selectedQuery={this.state.selectedQuery}
                        results={ results }
                        />
                    </div>
                </div>
            </div>
  }
}
