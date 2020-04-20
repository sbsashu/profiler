import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { AddEducation } from '../../actions/profile'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AddUserEducation = ({AddEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });
    const [toDateDisabled, toggledDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;
    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onsubmit = e => {
        e.preventDefault();
        AddEducation(formData, history)
    }
    
    return (
        <Fragment>
                <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onsubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    value={school}
                    onChange={e => onchange(e)}
                    name="school"
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    value={degree}
                    onChange={e => onchange(e)}
                    name="degree"
                    required
                />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy}
                    onChange={e => onchange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from}
                    onChange={e => onchange(e)}/>
                </div>
                <div className="form-group">
                <p>
                    <input type="checkbox" name="current" value={current} checked={current} onChange={e =>{
                        setFormData({...formData, current: !current});
                        toggledDisabled(!toDateDisabled);
                    }}
                    /> {' '}Current School
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" 
                    value={to}
                    onChange={e => onchange(e)}
                    disabled={toDateDisabled ? 'disabled': ''}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    value={description}
                    onChange={e => onchange(e)}
                    placeholder="Program Description"
                ></textarea>
                </div>
                <input type="submit"  className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
AddUserEducation.propTypes = {
    AddEducation: PropTypes.func.isRequired
}
export default connect(null, {AddEducation})(AddUserEducation);