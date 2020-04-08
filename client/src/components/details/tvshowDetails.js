import React,{Component} from 'react';
import axios from 'axios';
import Posts from '../posts/Posts';
import spinner from '../common/spinner.gif';

class TvShowDetails extends Component
{
    state={
        obj:{},
        load:false,
        genres:[],
        languages:[],
        image:""
    }

    componentDidMount()
    {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        if(myParam)
        {
            axios.get("https://api.themoviedb.org/3/tv/"+myParam+"?api_key=016cae63617a263ec533dc3ef336f9c6").then(data => {
                var a=[];
                var b=[];
                var c = "http://image.tmdb.org/t/p/w185"+data.data.poster_path;
                var i;
                for(i=0;i<data.data.genres.length&&i<3;i++)
                {
                    a.push(data.data.genres[i].name);
                }
                for(i=0;i<data.data.languages.length;i++)
                {
                    b.push(data.data.languages[i]);
                }
                this.setState({obj:data.data,load:true,genres:a,languages:b,image:c})
            });
        }
        else
        {
            this.props.history.push('/not-found');
        }
    }

    render()
    {

        const page = <React.Fragment>
        <div id="block">
            <img id="image1" height="420px"
                src= {this.state.image}
                alt="no">
            </img>
            <div id="miniBlock">
                <h1 className="title">
                    {this.state.obj.name}
                </h1>
                <div className="info">
                    <p className="text3">
                        {this.state.obj.tagline}
                    </p>
                    <p className="text">
                        Duration : <span className="text2">
                            {this.state.obj.episode_run_time+" min per episode"}
                        </span>
                    </p>
                    <p className="text right">
                        Popularity : <span className="text2">
                            {String(this.state.obj.popularity)}
                        </span>
                    </p>
                    
                    <p className="text">
                        Rating : <span className="text2">
                            {this.state.obj.vote_average}
                        </span>
                    </p>
                    <p className="text right">
                        Seasons : <span className="text2">
                            {String(this.state.obj.number_of_seasons)}
                        </span>
                    </p>
                    <p className="text">
                        Votes : <span className="text2">
                            {String(this.state.obj.vote_count)}
                        </span>
                    </p>
                    <p className="text">
                        Total Episodes : <span className="text2">
                            {String(this.state.obj.number_of_episodes)}
                        </span>
                    </p>
                    <p className="text">
                        Status : <span className="text2">
                            {String(this.state.obj.status)}
                        </span>
                    </p>
                    
                    <p className="text">
                        Genres : <span className="text2">
                            {String(this.state.genres)}
                        </span>
                    </p>
                    <p className="text">
                        Aired From : <span className="text2">
                            {String(this.state.obj.first_air_date)+" to "+String(this.state.obj.last_air_date)}
                        </span>
                    </p>
                    <p className="text">
                        Languages : <span className="text2">
                            {String(this.state.languages)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="story">
            <h1 className="text">Overview : </h1>
            <p className="text2">
                {String(this.state.obj.overview)}
            </p>
        </div>
        <div id="posts">
            <Posts idd={this.state.obj.id}/>
        </div>
    </React.Fragment>

    const spin = (
        <center>
            <img src={spinner} alt="spinner">
            </img>
        </center>
    )
        console.log(this.state)


        return (
            <div>
                {this.state.load ? page : spin}
            </div>
        )
    }
}



  export default TvShowDetails;