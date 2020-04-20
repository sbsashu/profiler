import React, { Fragment,useEffect } from 'react';
import { connect } from 'react-redux';
import { GetProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';
import { deleteAccount } from '../../actions/profile';


const Dashboard = ({ GetProfile, auth: { user }, profile: {profile, loading}, deleteAccount }) => {
    useEffect(() => {
        GetProfile();
    }, [GetProfile]);

return loading && profile === null ? <Spinner /> : <Fragment>
         <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.username }</i>
    </p>
    {profile !== null ? <Fragment>
        <DashboardActions />
        <Experience experience={profile.data.experience} />
        <Education education={profile.data.education} />
        <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
                <i className='fas fa-user-minus'></i>Delete My Account
            </button>
        </div>
    </Fragment> : <Fragment>
        <p>You have not yet create your profile ? Please create</p>
        <Link to='/create-profile'><input type='button' className='btn btn-primary' value='Create portfolio'/></Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    GetProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { GetProfile, deleteAccount })(Dashboard);