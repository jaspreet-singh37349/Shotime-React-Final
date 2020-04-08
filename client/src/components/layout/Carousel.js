import React, { Component } from 'react';
import img1 from '../../img/11.jpg'
import img2 from '../../img/13.jpg'
import img3 from '../../img/14.jpg'
import img4 from '../../img/12.jpg'
import img5 from '../../img/15.jpg'
import img6 from '../../img/img4.jpg'
import img7 from '../../img/img1.jpg'
import img8 from '../../img/img3.jpg'
import img9 from '../../img/img2.jpg'
import img10 from '../../img/img5.jpg'
import img11 from '../../img/tvimg1.jpg'
import img12 from '../../img/tvimg4.jpg'
import img13 from '../../img/tvimg5.jpg'
import img14 from '../../img/tvimg2.jpg'
import img15 from '../../img/tvimg3.jpg'
import aa from './carrousel';
import '../../carousel.css';

class Carousel extends Component {

  componentDidMount()
  {
    aa();
  }

  render() {
    var a,b,c,d,e;

    if(this.props.type==="anime")
    {
        a=img1;
        b=img2;
        c=img3;
        d=img4;
        e=img5;
    }
    else if(this.props.type==="movie")
    {
        a=img6;
        b=img7;
        c=img8;
        d=img9;
        e=img10;
    }
    else
    {
        a=img11;
        b=img12;
        c=img13;
        d=img14;
        e=img15;
    }
    return (
      
      <div className="gallery">
        
    <div id="contain" className="gallery-container">
      <img className="gallery-item" src={a} alt="error"/>
      <img className="gallery-item" src={b} alt="error"/>
      <img className="gallery-item" src={c} alt="error"/>
      <img className="gallery-item" src={d} alt="error"/>
      <img className="gallery-item" src={e} alt="error"/>
    </div>
    <div id="control" className="gallery-controls"></div>
  </div>
    );
  }
}


export default Carousel;
