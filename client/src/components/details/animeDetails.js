import React,{Component} from 'react';
import axios from 'axios';
import Posts from '../posts/Posts';
import spinner from '../common/spinner.gif';

class AnimeDetails extends Component
{
    state={
        obj:{},
        load:false,
        date:{},
        genres:[],
        producers:[]
    }
    componentDidMount()
    {   
        var urlParams = new URLSearchParams(window.location.search);
        var myParam = urlParams.get('id');
        if(myParam)
        {
            axios.get("https://cors-anywhere.herokuapp.com/api.jikan.moe/v3/anime/"+myParam).then(data => {
                var a=[];
                var b=[];
                var i;
                for(i=0;i<data.data.genres.length&&i<3;i++)
                {
                    a.push(data.data.genres[i].name);
                }
                for(i=0;i<data.data.producers.length&&i<4;i++)
                {
                    b.push(data.data.producers[i].name);
                }
                this.setState({obj:data.data,load:true,date:data.data.aired,genres:a,producers:b})
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
            <img id="image1" height="420px" src={this.state.obj.image_url} alt="no">

            </img>
            <div id="miniBlock">
                <h1 className="title">
                    {this.state.obj.title}
                </h1>
                <div className="info">
                    <p className="text">
                        Duration : <span className="text2">
                            {this.state.obj.duration}
                        </span>
                    </p>
                    <p className="text right">
                        Score : <span className="text2">
                            {this.state.obj.score}
                        </span>
                    </p>
                    <p className="text">
                        Rank : <span className="text2">
                            {this.state.obj.rank}
                        </span>
                    </p>
                    <p className="text right">
                        Airing : <span className="text2">
                            {String(this.state.obj.airing)}
                        </span>
                    </p>
                    <p className="text">
                        Popularity : <span className="text2">
                            {String(this.state.obj.popularity)}
                        </span>
                    </p>
                    <p className="text right">
                        Votes : <span className="text2">
                            {String(this.state.obj.favorites)}
                        </span>
                    </p>
                    <p className="text">
                        Episodes : <span className="text2">
                            {String(this.state.obj.episodes)}
                        </span>
                    </p>
                    <p className="text">
                        Genres : <span className="text2">
                            {String(this.state.genres)}
                        </span>
                    </p>
                    <p className="text">
                        Aired From : <span className="text2">
                            {String(this.state.date.string)}
                        </span>
                    </p>
                    <p className="text">
                        Producers : <span className="text2">
                            {String(this.state.producers)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="story">
            <h1 className="text">Story : </h1>
            <p className="text2">
                {String(this.state.obj.synopsis)}
            </p>
        </div>
        <div id="posts">
            <Posts idd={this.state.obj.mal_id}/>
        </div>
    </React.Fragment>

    const spin = (
        <center>
            <img src={spinner} alt="spinner">
            </img>
        </center>
    )
        console.log(this.state.producers)


        return (
            <div>
                {this.state.load ? page : spin}
            </div>
        )
    }
}



  export default AnimeDetails;