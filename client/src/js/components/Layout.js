import React from "react"
import { connect } from "react-redux"
import { fetchQueries } from "../actions/queriesActions"

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

  componentWillMount() {
    this.props.dispatch(fetchQueries());
  }

  render() {
    const { queries } = this.props;
    return  <div>
                <Nav />
                <div class="container-fluid">
                    <div class="row">
                        <Sidebar changeQuery={this.changeQuery.bind(this)}  queries={ queries }/>
                        <Dashboard  selectedQuery={this.state.selectedQuery} />
                    </div>
                </div>
            </div>
  }
}
