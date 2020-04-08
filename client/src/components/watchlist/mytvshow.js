import React,{Component} from 'react';
import axios from 'axios';

class MyTVshows extends Component
{
    state={
        obj:[]
    }

    details=(clk)=>{
        //console.log(clk.target.id);
        document.location.href="/tvshow/tvDetails?id="+clk.target.id;
    }

    componentDidMount()
    {
        axios
      .get('/api/users/gettvshow')
      .then(data => {
        console.log(data);
        this.setState({obj:data.data})
      })
    }

    render()
    {
        console.log(this.state);
        return (
            <div>
                <h1 className="text">My TV Shows : </h1>
                <div id="show" className="mylist">
                    {this.state.obj.map((res,index)=>{
                        if(res!=null)
                        {
                        return(
                        <div className="movie" key={index}>
                            <img className="imgdata" src={res.image} alt="error"/>
                            <p style= {{cursor:"pointer"}} id={res.tvId} onClick={this.details}>{res.title}</p>
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



  export default MyTVshows;