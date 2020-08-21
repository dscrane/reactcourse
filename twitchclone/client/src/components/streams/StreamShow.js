import React, {Component} from 'react';
import { connect } from 'react-redux'

import { fetchStream} from "../../redux/actions";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        StreamList
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) => {
   return {
     streams: this.state.stream[ownProps.match.params.id]
   }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);