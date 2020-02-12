import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions/index";
class StreamDelete extends React.Component {
  componentDidMount() {
    // StreamDelete()

    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    return (
      <>
        <button
          onClick={() => {
            this.props.deleteStream(this.props.match.params.id);
          }}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
        {/* <button onClick={() => history.push("/")} className="ui button"> */}
      </>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title "${this.props.stream.title}"?`;
  }
  render() {
    return (
      <Modal
        title="Delete Strem"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
