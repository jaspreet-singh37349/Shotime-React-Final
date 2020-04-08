import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class WatchList extends Component
{
    state={
        anime:[],
        tv:[],
        movie:[]
    }

    animeDetails=(clk)=>{
        console.log(clk.target);
        this.props.history.push("/anime/animeDetails?id="+clk.target.id);
    };

    movieDetails=(clk)=>{
        //console.log(clk.target.id);
        this.props.history.push("/movie/movieDetails?id="+clk.target.id);
    }

    tvDetails=(clk)=>{
        //console.log(clk.target.id);
        this.props.history.push("/tvshow/tvDetails?id="+clk.target.id);
    }

    componentDidMount()
    {
        axios
        .get('/api/users/getanime')
        .then(data => {
          console.log(data);
          this.setState({anime:data.data})
        })

        axios
      .get('/api/users/getmovie')
      .then(data => {
        console.log(data);
        this.setState({movie:data.data})
      })

      axios
      .get('/api/users/gettvshow')
      .then(data => {
        console.log(data);
        this.setState({tv:data.data})
      })
    }

    render()
    {
        console.log(this.state);
        return (
            <div>
                <Link to="/myanimes"><h1 className="text">My animes : </h1></Link>
                <div id="show1" className="mylist">
                    {this.state.anime.slice(0, 5).map((res,index)=>{
                        if(res!=null)
                        {
                        return(
                        <div className="anim" key={index}>
                            <img onClick={this.animeDetails} style= {{cursor:"pointer"}} id={res.animeId} className="imgdata" src={res.image} alt="error"/>
                            <p id={res.animeId}>{res.title}</p>
                        </div>
                        )}
                        else if(res===null&&index===0)
                        {
                            return(
                                <div>
                                    <center>
                                        <p className="center">No Animes in your list</p>
                                    </center>
                                </div>
                            )
                        }
                        else
                        {
                            return(
                                <div></div>
                            )
                        }
                })}
                </div>
                <Link to="/mymovies"><h1 className="text">My Movies : </h1></Link>
                <div id="show2" className="mylist">
                {this.state.movie.slice(0,5).map((res,index)=>{
                        if(res!=null)
                        {
                        return(
                        <div className="movie" key={index}>
                            <img style= {{cursor:"pointer"}} id={res.movieId} onClick={this.movieDetails} className="imgdata" src={res.image} alt="error"/>
                            <p>{res.title}</p>
                        </div>
                        )}
                        else if(res===null&&index===0)
                        {   
                            return(
                                <div>
                                    <center>
                                        <p className="center">No Movies in your list</p>
                                    </center>
                                </div>
                            )
                        }
                        else
                        {
                            return(
                                <div></div>
                            )
                        }
                    })}
                </div>
                <Link to="/mytvshows"><h1 className="text">My TVShows : </h1></Link>
                <div id="show3" className="mylist">
                {this.state.tv.slice(0,5).map((res,index)=>{
                        if(res!=null)
                        {
                        return(
                        <div className="movie" key={index}>
                            <img style= {{cursor:"pointer"}} id={res.tvId} onClick={this.tvDetails} className="imgdata" src={res.image} alt="error"/>
                            <p>{res.title}</p>
                        </div>
                        )}
                        else if(res===null&&index===0)
                        {
                            return(
                                <div>
                                    <center>
                                        <p className="center">No TV Shows in your list</p>
                                    </center>
                                </div>
                            )
                        }
                        else
                        {
                            return(
                                <div></div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}



  export default WatchList;