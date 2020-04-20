import React, { Fragment } from 'react';
import Moment from 'react-moment'
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';
const Education = ({ education, deleteEducation }) => {
    const exp = education.map(expr => (
        <tr key={expr._id}>
            <td>{expr.school}</td>
            <td className='hide-sm'>{expr.degree}</td>
           <td><Moment format='YYYY/MM/DD'>{expr.from}</Moment> -{' '}
           {
            expr.to === "" ? (' Now'): (<Moment format='YYYY/MM/DD'>{expr.to}</Moment>)
            }
            </td>
            <td>
                <button className='btn btn-danger' onClick = {() => deleteEducation(expr._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
        <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{exp}</tbody>
            </table>
        </Fragment>
    )
}
Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null, {deleteEducation} )(Education);
