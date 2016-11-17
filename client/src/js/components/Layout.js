import React from "react"
import { connect } from "react-redux"
import { fetchQueries, addQuery, updateQuery, deleteQuery } from "../actions/queriesActions"
import { fetchData } from "../actions/dataActions"

import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Login from "./Login";

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
        selectedUserId: "001",
        selectedUserName: "Usuario Anónimo",
      };

    }

  changeQuery(selectedQuery) {
    this.setState({selectedQuery});
    this.props.dispatch(fetchData(selectedQuery));
  }

  changeUser(selectedUserId, selectedUserName) {
    this.setState({selectedUserId});
    this.setState({selectedUserName});
    this.props.dispatch(fetchQueries(this.state.selectedUserId));
  }

  newQuery(newQuery) {
    this.props.dispatch(addQuery(newQuery, this.state.selectedUserId));
  }

  editQuery(id, query) {
    this.props.dispatch(updateQuery(id, query, this.state.selectedUserId));
  }

  removeQuery(id) {
    this.props.dispatch(deleteQuery(id));
  }

  componentWillMount() {
    this.props.dispatch(fetchQueries(this.state.selectedUserId));
    this.props.dispatch(fetchData(this.state.selectedQuery));
  }

  render() {
    const { queries, data } = this.props;
    var results = data.results;
    return  <div>
                <Nav />
                <div class="container-fluid">
                    <div class="row">
                       <div class="col-md-4">
                          <Login
                          selectedUserId={this.state.selectedUserId}
                          selectedUserName={this.state.selectedUserName}
                          changeUser={this.changeUser.bind(this)}
                          />
                          <Sidebar
                              newQuery={this.newQuery.bind(this)}
                              editQuery={this.editQuery.bind(this)}
                              removeQuery={this.removeQuery.bind(this)}
                              changeQuery={this.changeQuery.bind(this)}
                              queries={ queries }
                            />
                        </div>
                        <Dashboard
                        selectedQuery={this.state.selectedQuery}
                        results={ results }
                        />
                    </div>
                </div>
            </div>
  }
}
