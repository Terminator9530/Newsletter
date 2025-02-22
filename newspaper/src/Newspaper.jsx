import React,{useEffect} from "react";
import News from "./News";

function Newspaper(){
    const [state,setState]=React.useState([]);
    const allnews=[];
    const allscore={};

    //--------------------------------Get Request for getting stories------------------------------------------//

    useEffect(()=>{
        fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=prett")
      .then(res=>res.json())
      .then(
        (result) => {
          for(var i=0;i<result.length;i++){
            getContent(result[i],i, result.length);
          }
          
        },
        (error) => {
          console.log(error);
        }
      )
    },[]);

    //--------------------------------Get Request to get details about individual story ------------------------------------------//

    async function getContent(val,i, len){
        await fetch(`https://hacker-news.firebaseio.com/v0/item/${val}.json?print=pretty`)
        .then(res=>res.json())
        .then(result=> {
            var title=result.title.replace("Ask HN: ", "");
            var score=result.score;
            allnews.push({title:title,content:result.text,score:score});
            if(i===len-1){
                setState(allnews);
            }
        });
    }

    //--------------------------------Title font size according to score of that story------------------------------------------//

    var count=25,i;
    for(i in state){
      allscore[state[i].score]="";
    }
    var keys=Object.keys(allscore);
    for(i in keys){
      if(allscore[keys[i]]==="")
      allscore[keys[i]]=count++;
    }
    return (
        <div className="card-columns">
            {state.map((item,index)=>{
                return <News item={item.title} size={allscore[item.score]} content={item.content} key={index} />
            })}
        </div>
    );
}

export default Newspaper;