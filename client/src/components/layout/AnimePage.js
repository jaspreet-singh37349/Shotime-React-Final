import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from './Carousel';
import { types } from '../../actions/typeAction';
import axios from 'axios';
import spinner from '../common/spinner.gif';
import store from '../../store';

class Anime extends Component
{
  state={
    load:false,
    obj:[]
  }
  componentDidMount()
  {
    
    this.props.types('Anime');

        axios.get("https://cors-anywhere.herokuapp.com/api.jikan.moe/v3/top/anime/1").then(data => 
        {
            console.log(data);
                
            this.setState({load:true,obj:data.data.top});
            //console.log(arrData);
        });
        
  }

    render()
    {

      function details(bt){
        //console.log(bt.target.id);
        document.location.href="/anime/animeDetails?id="+bt.target.id;
      }
      function add(bt){
        //bt.target.value="Remove";
        if(store.getState().auth.isAuthenticated)
        {
        var iddd = Number(bt.target.id);
        axios
        .patch('/api/users/addAnime',{idd:iddd,title:bt.target.title,image:bt.target.name})
        .then(res => {
          if(res.data==="error")
          {
            alert("Already Added to AnimeList")
          }
          else
          {
            console.log(res);
            alert("Anime Added To Your List")
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
                <Carousel type="anime"/>
            </div>
            <h1 id="heading">Most Popular Animes : </h1>
            {this.state.load ? null : spin}
            <div id="showData" className="caards">
              {this.state.obj.map((res,index)=>{
                    return(
                      <div className="flip-card" key={index}>
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <div className="anim">
                              <img className="imgdata" src={res.image_url} alt="error"/>
                              <p>{res.title}</p>
                            </div>
                          </div>

                          <div className="flip-card-back">
                            <div className="anim">
                              <div className="flip-card-data">
                                <h2>Details:</h2>
                                <p>Start Date : {res.start_date}</p>
                                <p>End Date : {res.end_date}</p>
                                <p>Episodes : {res.episodes}</p>
                                <p>Score : {res.score}</p>
                                <button style= {{cursor:"pointer"}} className="details" id={res.mal_id} onClick={details}>
                                  More Details
                                </button>
                                <input style= {{cursor:"pointer"}} type="button" className="add" value="ADD" id={res.mal_id} title={res.title} name={res.image_url} onClick={add}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
              })}
            </div>
        </React.Fragment>
        )
    }
}

Anime.propTypes = {
    types: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    type: state.type
  });

  export default connect(mapStateToProps, { types })(Anime);