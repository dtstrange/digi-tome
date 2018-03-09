import React from 'react'

class Profile extends React.Component {
    render() {
        return(
            <div id="main">
                <h2>My Stories</h2>
                <div id="profile-stories">
                    <div class="story">
                        <div class="story-title">
                            <h3>Sample 1</h3>
                        </div>
                        <div class="story-synopsis">
                            <p>A tale where something happens, lots of people die, but a couple people survive.
                            Bittersweet ending.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;