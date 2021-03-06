import React from "react";

//reduxForm is a function like connect in react-redux library
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = ` field ${meta.error && meta.touched ? "error" : ""}`;
    // return  <input onChange={formProps.input.onChange} value={formProps.input.value} />
    //or
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
        {/* <div>{meta.error}</div> */}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You Must Enter Title!";
  }
  if (!formValues.description) {
    errors.description = "You Must Enter Description!";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);

// export default reduxForm({ form: "streamCreate", validate })(StreamCreate);
