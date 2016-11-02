import React from "react"
import { connect } from "react-redux"
import { fetchData } from "../actions/dataActions"

import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

@connect((store) => {
  return {
    data: store.data.data,
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchData())
  }

  render() {
    const { data } = this.props;

    const queries = data.map(item => <li key={item._id}>{item.query}</li>)

    return  <div>
                <Nav />
                <div class="container-fluid">
                    <div class="row">
                        <Sidebar queries = {queries}/>
                        <Dashboard />
                    </div>
                </div>
            </div>
  }
}
