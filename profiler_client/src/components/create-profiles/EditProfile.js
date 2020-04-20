import React, { Fragment,  useState, useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { CreateProfileUpdate, GetProfile } from '../../actions/profile';
import { withRouter, Link } from 'react-router-dom';

const EditProfile = ({CreateProfileUpdate, history, GetProfile, profile: {profile, loading}}) => {
    let [formData, setFormData] = useState({
        company: '',
        location: '',
        website: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        facebook: '',
        youtube: '',
        linkedin: '',
        instagram: '',
        twitter: '',
        github: ''
    })

    let [toggleInput, setToggleInput] = useState(false)
    useEffect(() => {
        GetProfile();

        setFormData({
            company: loading || !profile.data.company ? '' : profile.data.company,
            website: loading || !profile.data.website ? '' : profile.data.website,
            location: loading || !profile.data.location ? '' : profile.data.location,
            status: loading || !profile.data.status ? '' : profile.data.status,
            skills: loading || !profile.data.skills ? '' : profile.data.skills.join(','),
            githubusername: loading || !profile.data.githubusername ? '' : profile.data.githubusername,
            bio: loading || !profile.data.bio ? '' : profile.data.bio,
            twitter: loading || !profile.data.social ? '' : profile.data.social.twitter,
            facebook: loading || !profile.data.social ? '' : profile.data.social.facebook,
            linkedin: loading || !profile.data.social ? '' : profile.data.social.linkedin,
            instagram: loading || !profile.data.social ? '' : profile.data.social.instagram,
            youtube: loading || !profile.data.social ? '' : profile.data.social.youtube
        })
    }, [loading, GetProfile]);
    
    let {
        company,
        location,
        website,
        status,
        skills,
        bio,
        githubusername,
        facebook,
        youtube,
        linkedin,
        instagram,
        twitter,
    } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        CreateProfileUpdate(formData, history, true);
    }

    return (
        <Fragment>
      <h1 className="large text-primary">
        Update Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value = {status} onChange = {e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value = {company} onChange = {e => onChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value = {website} onChange = {e => onChange(e)}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value = {location} onChange = {e => onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value = {skills} onChange = {e => onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value = {githubusername}
            onChange = {e => onChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value = {bio} onChange = {e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={() => setToggleInput(!toggleInput)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
          {toggleInput && <Fragment>
            <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value = {twitter} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value = {facebook} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value = {youtube} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value = {linkedin} onChange={e => onChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value = {instagram} onChange={e => onChange(e)}/>
            </div>
            </Fragment>
        }
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    CreateProfileUpdate: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    GetProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => (
 {
    profile: state.profile
 } 
)
export default connect(mapStateToProps, {CreateProfileUpdate, GetProfile})(withRouter(EditProfile));