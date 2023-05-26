import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'

const Profile = ({user}) => {
  return (
    <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='profileContainer'>
            <div>
                <h1>My Profilex`</h1>
            </div>
        </div>
    </Fragment>

  )
}

export default Profile
