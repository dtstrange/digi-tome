import React from 'react'
import axios from 'axios'

class Profile extends React.Component {

  

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            description: '',
            genre1: '',
            genre2: '',
            genre3: ''
        }
    }
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        let genre = this.state.genre1;
        if (this.state.genre2) genre += "," + this.state.genre2;
        if (this.state.genre3) genre += "," + this.state.genre3;
       
        axios({
            url: '/api/books/search?title=' + this.state.title + "&genre=" + genre + "&description=" + this.state.description + "&price=" + this.state.bookPrice,
            method: 'get',
            headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                console.log(resp.data.response[1].title)
                this.setState({
                    data: resp.data.response
                })
                

            }).catch((error) => {
                console.error(error);
            })
    }




    render() {
        return(
            <div id="main">
                <h2>My Stories</h2>
                <div id="profile-stories">
                    <div className="story">
                        <div className="story-title">
                            <h3>{this.state.title}</h3>
                        </div>
                        <div className="story-synopsis">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
    

export default Profile;