import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../redux/actions';

class StreamDelete extends Component {
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
    stream: this.state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamDelete)