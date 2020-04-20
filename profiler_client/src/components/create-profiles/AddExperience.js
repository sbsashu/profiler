import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { AddExperience } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AddUserExperience = ({AddExperience, history}) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    const [toDateDisabled, toggledDisabled] = useState(false);
    const { title, company, location, from, to, current, description } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        AddExperience(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e =>onSubmit(e)}>
            <div className="form-group">
            <input type="text" placeholder="* Job Title" value={title} onChange = {e => onChange(e)} name="title" required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Company" value={company} onChange={e => onChange(e)} name="company" required />
            </div>
            <div className="form-group">
            <input type="text" placeholder="Location" value={location} onChange = {e => onChange(e)} name="location" />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value = {from} onChange = { e => onChange(e)} />
            </div>
            <div className="form-group">
            <p><input type="checkbox" name="current" checked = {current} value= {current} onChange = {e => {
                setFormData({...formData, current: !current});
                toggledDisabled(!toDateDisabled);
            }} />{' '}Current Job</p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled = {toDateDisabled ? 'disabled': ''} />
            </div>
            <div className="form-group">
            <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
AddUserExperience.propTypes = {
    AddExperience: PropTypes.func.isRequired
}
export default connect(null, {AddExperience})(withRouter(AddUserExperience));