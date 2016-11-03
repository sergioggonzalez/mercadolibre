import React from "react"
import { connect } from "react-redux"
import { fetchQueries, addQuery } from "../actions/queriesActions"

import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

@connect((store) => {
  return {
    queries: store.queries.queries,
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
  }

  newQuery(newQuery) {
    this.props.dispatch(addQuery(newQuery, '001'));
  }

  componentWillMount() {
    this.props.dispatch(fetchQueries('001'));
  }

  render() {
    const { queries } = this.props;
    return  <div>
                <Nav />
                <div class="container-fluid">
                    <div class="row">
                        <Sidebar newQuery={this.newQuery.bind(this)} changeQuery={this.changeQuery.bind(this)}  queries={ queries }/>
                        <Dashboard  selectedQuery={this.state.selectedQuery} />
                    </div>
                </div>
            </div>
  }
}
