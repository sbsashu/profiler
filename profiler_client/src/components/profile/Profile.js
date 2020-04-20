import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop';
import { GetProfileById } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitHub from './ProfileGitHub';


const Profile = ({
    GetProfileById,
    profile: {profile, loading},
    auth,
    match
}) => {
    useEffect(() => {
        GetProfileById(match.params.id);
    }, [GetProfileById, match.params.id])

return <Fragment>
        {profile === null || loading ? <Spinner /> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>Back to Profile</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.data.user._id && (<Link to='/edit-profile' className='btn btn-dark'> 
            Edit Profile
            </Link>)}
            <div className='profile-grid my-1'>
                <ProfileTop profile = {profile.data}/>
                <ProfileAbout profile = {profile.data}/>
                <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Experience</h2>
                        {profile.data.experience.length > 0 ? ( <Fragment>
                            {profile.data.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))
                            }
                        </Fragment>) : (<h4>No experience credential found</h4>)}                  
                </div>
                <div className='profile-edu bg-white p-2'>
                    <h2 className='text-primary'>Education</h2>
                        {profile.data.education.length > 0 ? ( <Fragment>
                            {profile.data.education.map(education => (
                                <ProfileEducation key={education._id} education={education}/>
                            ))
                            }
                        </Fragment>) : (<h4>No experience credential found</h4>)}                  
                </div>
                        {profile.data.githubusername && (<ProfileGitHub username = {profile.data.githubusername}/>)}
            </div>
        </Fragment> }
    </Fragment>
}

Profile.propTypes = {
    GetProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { GetProfileById })(Profile);