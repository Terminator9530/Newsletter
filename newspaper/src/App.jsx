import React,{useEffect} from "react";
import Card from "./Card";

function App(){
    const [state,setState]=React.useState([]);
    const allnews=[];
    const allscore={};
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

    async function getContent(val,i, len){
        await fetch(`https://hacker-news.firebaseio.com/v0/item/${val}.json?print=pretty`)
        .then(res=>res.json())
        .then(result=> {
            var title=result.title.replace("Ask HN: ", "");
            var score=result.score;

            console.log(score);
            allnews.push({title:title,content:result.text,score:score});
            if(i===len-1){
                console.log("setting state")
                setState(allnews);
            }
        });
    }
    var count=25;
    for(var i in state){
      allscore[state[i].score]="";
    }
    var keys=Object.keys(allscore);
    for(var i in keys){
      if(allscore[keys[i]]==="")
      allscore[keys[i]]=count++;
    }
    return (
        <div className="card-columns">
            {state.map((item,index)=>{
                return <Card item={item.title} size={allscore[item.score]} content={item.content} key={index} />
            })}
        </div>
    );
}

export default App;