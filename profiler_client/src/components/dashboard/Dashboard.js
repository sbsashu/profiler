import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { GetProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const Dashboard = ({ GetProfile, auth: { user }, profile: {profile, loading} }) => {

    useEffect(() => {
        GetProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
         <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.username }</i>
    </p>
    {profile !== null ? <Fragment>'Has'</Fragment> : <Fragment>
        <p>You have not yet create your profile ? Please create</p>
        <Link to='/create-profile'><input type='button' className='btn btn-primary' value='Create portfolio'/></Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    GetProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { GetProfile })(Dashboard);