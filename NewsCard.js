import React from "react";

const NewsCard = ({ title, description, imageUrl, author, newsUrl, date, source }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
    <img src={imageUrl? imageUrl : "newsimg.jpg" } className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{title?.slice(0, 56) ?? "No Title Available"+"..."}</h5>
      <p className="card-text">{description?.slice(0, 127) ?? "No Title Available"+ "..."}</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">{author ? `By ${author}` : "Unknown author"}</li>
      <li className="list-group-item">Published on {new Date(date).toDateString()}</li>
      <li className="list-group-item">Published At {source}</li>
    </ul>
    <div className="card-body">
      <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More..</a>
      
    </div>
  </div>
    
  );
};

export default NewsCard;