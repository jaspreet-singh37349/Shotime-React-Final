import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from './Carousel';
import { types } from '../../actions/typeAction';
import axios from 'axios';
import spinner from '../common/spinner.gif';
import store from '../../store';

class TVshow extends Component
{
    state={
        load:false,
        obj:[]
    }
    componentDidMount()
    {
    this.props.types('TV'); 

    axios.get("https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=016cae63617a263ec533dc3ef336f9c6").then(data => {
            //console.log(data);

        console.log(data);
        this.setState({load:true,obj:data.data.results});
    });

    document.getElementById("showData").style.display="flex";
    }

    render()
    {
        function details(bt){
            //console.log(bt.target.id);
            document.location.href="/tvshow/tvDetails?id="+bt.target.id;
        }
          function add(bt){
            //bt.target.value="Remove";
            if(store.getState().auth.isAuthenticated)
            {
            var iddd = Number(bt.target.id);
            axios
            .patch('/api/users/addTVshow',{idd:iddd,title:bt.target.title,image:bt.target.name})
            .then(res => {
              if(res.data==="error")
              {
                alert("Already Added to TVshowList")
              }
              else
              {
                console.log(res);
                alert("TV Show Added To Your List")
              }
            })
            }
          else
          {
            alert("Please Login First")
          }
          }

        const spin = (
            <center>
                <img src={spinner} alt="spinner">
                </img>
            </center>
        )
        return (
        <React.Fragment>
          <center>
          <h1 className="display-3 mb-4 showtimee">ShowTime</h1>
          </center>
            <div id="abc">
                <Carousel type="tv"/>
            </div>
            <h1 id="heading">Most Popular TV Shows : </h1>
            {this.state.load ? null : spin}
            <div id="showData" className="caards">
            {this.state.obj.map((res,index)=>{
                    if(res.poster_path)
                    {
                    return(
                      <div className="flip-card" key={index}>
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <div className="anim">
                              <img className="imgdata" src={"http://image.tmdb.org/t/p/w185"+res.poster_path} alt="error"/>
                              <p>{res.name}</p>
                            </div>
                          </div>

                          <div className="flip-card-back">
                            <div className="anim">
                              <div className="flip-card-data">
                                <h2>Details:</h2>
                                <p>Release Date : {res.first_air_date}</p>
                                <p>Popularity : {res.popularity}</p>
                                <p>Votes : {res.vote_count}</p>
                                <p>Rating : {res.vote_average}</p>
                                
                                <button style= {{cursor:"pointer"}} className="details" id={res.id} onClick={details}>
                                    More Details
                                </button>
                                <input style= {{cursor:"pointer"}} type="button" className="add" value="ADD" id={res.id} title={res.name} name={"http://image.tmdb.org/t/p/w185"+res.poster_path} onClick={add}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    else
                    {
                      return(
                        <div key={index}></div>
                      )
                    }
              })}
            </div>          
        </React.Fragment>
        )
    }
}

TVshow.propTypes = {
    types: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    type: state.type
  });

  export default connect(mapStateToProps, { types })(TVshow);