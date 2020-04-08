import React,{Component} from 'react';
import axios from 'axios';

class MyAnimes extends Component
{
    state={
        obj:[]
    }

    componentDidMount()
    {
        axios
      .get('/api/users/getanime')
      .then(data => {
        console.log(data);
        this.setState({obj:data.data})
      })
    }

    details=(clk)=>{
        //console.log(clk.target.id);
        document.location.href="/anime/animeDetails?id="+clk.target.id;
    };

    render()
    {
        console.log(this.state);
        return (
            <div>
                <h1 className="text">My animes : </h1>
                <div id="show" className="mylist">
                {this.state.obj.map((res,index)=>{
                    if(res!=null)
                    {
                    return(
                      <div className="anim" key={index}>
                        <img className="imgdata" src={res.image} alt="error"/>
                        <p style= {{cursor:"pointer"}} id={res.animeId} onClick={this.details}>{res.title}</p>
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
            </div>
        )
    }
}



  export default MyAnimes;