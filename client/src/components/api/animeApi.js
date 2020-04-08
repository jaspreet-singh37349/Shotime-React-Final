import axios from "axios";
import spinner from '../common/spinner.gif';


var animapi = (txtSearch,auth) =>
    {
        function add(id,ttl,img){
            if(auth)
            {
              var iddd = Number(id);
              axios
              .patch('/api/users/addAnime',{idd:iddd,title:ttl,image:img})
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
        document.getElementById("abc").style.display="none";

        var i;
        //var arrData=[];

        document.getElementById("showData").innerHTML="";
        var newHeading = "Results for : "+txtSearch;
        document.getElementById("heading").innerHTML="<h1>"+newHeading+"</h1>";
        
        var spin = document.createElement('img');
        spin.src=spinner;
        document.getElementById("showData").appendChild(spin);
        axios.get("https://cors-anywhere.herokuapp.com/api.jikan.moe/v3/search/anime?q="+txtSearch+"&limit=20").then(data => 
        {
            console.log(data);
            document.getElementById("showData").innerHTML="";
            var para,node;
            if(data.data.results.length===0)
            {
                para = document.createElement('p'); 
                node = document.createTextNode("No Data Found");
                para.appendChild(node);
                document.getElementById("showData").appendChild(para);
            }
            else
            {
            for(i=0;i<data.data.results.length;i++)
            {
              if(data.data.results[i].image_url)
              {
                //arrData.push(data.results[i].title);
                var divv1 = document.createElement('div');
                divv1.className="flip-card";
                var divv2 = document.createElement('div');
                divv2.className="flip-card-inner";
                var divv3 = document.createElement('div');
                divv3.className="flip-card-front";
                var divv4 = document.createElement('div');
                divv4.className="flip-card-back";

                var divvv = document.createElement('div');
                divvv.className="anim";

                var divback = document.createElement('div');
                divback.className="flip-card-data";

                var divv = document.createElement('div');
                divv.className="anim";
                
                var img = document.createElement('img');
                    img.className="imgdata"; 
                    img.src =  data.data.results[i].image_url;

                var head2 = document.createElement('h2'); 
                var nn = document.createTextNode('Details:');
                head2.appendChild(nn);

                var btn = document.createElement('input');
                btn.type="button"
                btn.className="details"
                btn.value="More Details"
                btn.id=data.data.results[i].mal_id;
                btn.onclick = function(bt){
                    //console.log(bt.target.id);
                    document.location.href="/anime/animeDetails?id="+bt.target.id;
                  };
                var btnn = document.createElement('input');
                btnn.type="button"
                btnn.className="add"
                btnn.value="ADD"
                btnn.id=data.data.results[i].mal_id;
                btnn.title=data.data.results[i].title;
                btnn.img=data.data.results[i].image_url;
                btnn.onclick = function(bt){
                  //bt.target.value="Remove";
                  add(bt.target.id,bt.target.title,bt.target.img);
                };
 
                var start = new Date(data.data.results[i].start_date);
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var date= months[start.getMonth()];
                date+=" "+start.getFullYear();
                para = document.createElement('p');
                node = document.createTextNode("Start Date : "+date);
                para.appendChild(node);

                divback.appendChild(head2);
                divback.appendChild(para);

                var end = new Date(data.data.results[i].end_date);
                date= months[end.getMonth()];
                date+=" "+end.getFullYear();
                para = document.createElement('p');
                node = document.createTextNode("End Date : "+date);
                para.appendChild(node);
                divback.appendChild(para);

                para = document.createElement('p'); 
                node = document.createTextNode("Episodes : "+data.data.results[i].episodes);
                para.appendChild(node);
                divback.appendChild(para);

                para = document.createElement('p'); 
                node = document.createTextNode("Score : "+data.data.results[i].score);
                para.appendChild(node);
                divback.appendChild(para);

                divback.appendChild(btn);
                divback.appendChild(btnn);
        
                para = document.createElement('p'); 
                node = document.createTextNode(data.data.results[i].title);
                para.appendChild(node);
        
                divv.appendChild(img);
                divv.appendChild(para);
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
            //console.log(arrData);
        
        }).catch(err => {
            console.log(err);
        });
        
        document.getElementById("showData").style.display="flex";
        
    }

    export default animapi;