import axios from "axios";
import spinner from '../common/spinner.gif';

var tvapi = (txtSearch,auth)=>
{
    function add(id,ttl,img){
        if(auth)
        {
            var iddd = Number(id);
            axios
            .patch('/api/users/addTVshow',{idd:iddd,title:ttl,image:img})
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
    document.getElementById("abc").style.display="none";

    var i;
    //var arrData=[];

    document.getElementById("showData").innerHTML="";
    var newHeading = "Results for : "+txtSearch;
    document.getElementById("heading").innerHTML="<h1>"+newHeading+"</h1>";
        
    var spin = document.createElement('img');
    spin.src=spinner;
    document.getElementById("showData").appendChild(spin);

    axios.get("https://api.themoviedb.org/3/search/tv?api_key=016cae63617a263ec533dc3ef336f9c6&query="+txtSearch).then(data => {
            //console.log(data);

        console.log(data);
        document.getElementById("showData").innerHTML="";

        if(data.data.results.length===0)
        {
            var para = document.createElement('p'); 
            var node = document.createTextNode("No Data Found");
            para.appendChild(node);
            document.getElementById("showData").appendChild(para);
        }
        else
        {
            for(i=0;i<data.data.results.length;i++)
            {
                if(data.data.results[i].poster_path)
                {
                var divv = document.createElement('div');
                divv.className="movie";

                var divv1 = document.createElement('div');
                divv1.className="flip-card";
                var divv2 = document.createElement('div');
                divv2.className="flip-card-inner";
                var divv3 = document.createElement('div');
                divv3.className="flip-card-front";
                var divv4 = document.createElement('div');
                divv4.className="flip-card-back";

                var divvv = document.createElement('div');
                divvv.className="movie";

                var divback = document.createElement('div');
                divback.className="flip-card-data";
                
                var img = document.createElement('img'); 
                    img.src = "http://image.tmdb.org/t/p/w185"+ data.data.results[i].poster_path;
                    img.className="imgdata"; 
                    divv.appendChild(img);
                para = document.createElement('p'); 
                node = document.createTextNode(data.data.results[i].name);
                para.appendChild(node);
                divv.appendChild(para);

                var head2 = document.createElement('h2'); 
                var nn = document.createTextNode('Details:');
                head2.appendChild(nn);
                divback.appendChild(head2);

                para = document.createElement('p'); 
                node = document.createTextNode("Release Date : "+data.data.results[i].first_air_date);
                para.appendChild(node);
                divback.appendChild(para);

                para = document.createElement('p'); 
                node = document.createTextNode("Popularity : "+data.data.results[i].popularity);
                para.appendChild(node);
                divback.appendChild(para);

                para = document.createElement('p'); 
                node = document.createTextNode("Votes : "+data.data.results[i].vote_count);
                para.appendChild(node);
                divback.appendChild(para);

                para = document.createElement('p'); 
                node = document.createTextNode("Rating : "+data.data.results[i].vote_average);
                para.appendChild(node);
                divback.appendChild(para);

                var btn = document.createElement('input');
                btn.type="button"
                btn.className="details"
                btn.value="More Details"
                btn.id=data.data.results[i].id;
                btn.onclick = function(bt){
                    //console.log(bt.target.id);
                    document.location.href="/tvshow/tvDetails?id="+bt.target.id;
                };
                var btnn = document.createElement('input');
                btnn.type="button"
                btnn.className="add"
                btnn.value="ADD"
                btnn.id=data.data.results[i].id;
                btnn.title=data.data.results[i].name;
                btnn.img= "http://image.tmdb.org/t/p/w185"+ data.data.results[i].poster_path;
                btnn.onclick = function(bt){
                    //bt.target.value="Remove";
                    add(bt.target.id,bt.target.title,bt.target.img);
                };
                divback.appendChild(btn);
                divback.appendChild(btnn);
        
                divvv.appendChild(divback);
                divv4.appendChild(divvv);
                divv3.appendChild(divv);
                divv2.appendChild(divv3);
                divv2.appendChild(divv4);
                divv1.appendChild(divv2);
                document.getElementById('showData').appendChild(divv1);
            }
        }
    }
    });

    document.getElementById("showData").style.display="flex";
}

export default tvapi;