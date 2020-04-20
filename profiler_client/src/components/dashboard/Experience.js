import React, { Fragment } from 'react';
import Moment from 'react-moment'
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';
import {connect} from 'react-redux';

const Experience = ({ experience, deleteExperience }) => {
    const exp = experience.map(expr => (
        <tr key={expr._id}>
            <td>{expr.company}</td>
            <td className='hide-sm'>{expr.title}</td>
           <td><Moment format='YYYY/MM/DD'>{expr.from}</Moment> -{' '}
           {
            expr.to === "" ? (' Now'): (<Moment format='YYYY/MM/DD'>{expr.to}</Moment>)
            }
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteExperience(expr._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{exp}</tbody>
            </table>
        </Fragment>
    )
}
Experience.propTypes = {
    experience: PropTypes.array,
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null, { deleteExperience })(Experience);
