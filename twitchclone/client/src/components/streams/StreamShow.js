import React, {Component} from 'react';
import { connect } from 'react-redux'

import { fetchStream } from "../../redux/actions";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream
    return (
      <div>
        <div className='content'>
          <h3>{title}</h3>
          <h5>{description}</h5>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) => {
   return {
     stream: state.streams[ownProps.match.params.id]
   }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);