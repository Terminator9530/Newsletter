import React from "react";

function News(props){
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{'fontSize':props.size+'px'}}>{props.item}</h5>
                <p className="card-text" style={{'fontFamily':'Mali,cursive'}} dangerouslySetInnerHTML={{__html: props.content?props.content:"No Content Found"}}></p>
            </div>
        </div>
    );
}

export default News;