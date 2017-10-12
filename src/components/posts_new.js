import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        // using es6 destrucruring feature
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={ className }>
                <label>{ field.label }</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : '' }
                </div>
            </div>
        )
    }

    onSubmit(values) {
        // this === component
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    // The Field component which we are using to specify an input inside of 
    // this component
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(values); // { title: 'sdfsdf', categories: 'safsd', content: 'sdfsfd' }
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = 'Enter a title!';
    }
    if (!values.categories) {
        errors.categories = 'Enter a categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content please';
    }
    // If errors is empty, the form is fine to submit
    // If errors has any properties, redux form assumes form is invalid
    return errors;
}


// reduxForm is very similar to connect function from react-redux library
// we use reduxForm helper to wrap the postsNew component, by doing so,
// we gave reduxForm the ability to communicate directly from this component
// to the reducer that we wired up.

// The form property below is used to specify a kind of namespace of sorts, 
// for all the state that is going to be generated by this particular component.
// the only requirement for the form property is that it's unique, and the only 
// needs to be unique if you want this form to essentially live in isolation and 
// not share any of its state with any other forms
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);