import axios from "axios";
import "./App.css"
import {useEffect, useState } from "react";
import {Link } from "react-router-dom";
const Search = () => {
  const [img,setImg] = useState([]);
  const [result,setResult] = useState("");
  const KEY = "QJdcoIR71UPtd0XMGDIO716ukD7Mtf8YTib-t4YoGpE";

  const handleChange = (e)=>{
    setResult(e.target.value);
  }
 
  const handleClick = ()=>{
    axios.get(`https://api.unsplash.com/search/photos?query=${result}&client_id=${KEY}`)
    .then((response)=> {
      // console.log(response);
      console.log(response.data);
      // console.log(response.data[0]);
      setImg(response.data.results)
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  return (
    <>
      
        <div className="search">
          <h1>Task For React Developer</h1>
          <div className="form">
            <input className="find" type="text" name="search" value={result} onChange={handleChange} placeholder="Search image here......"/>
            <input className="btn" type="button" value="Search" onClick={handleClick}/>

          </div>
        </div>
        <div className="container">
          <div className="cart">
            { 
              img.map(item => {return(
                <div key={item.id}>
                  <div className="image">
                    <img src={item.urls.small} alt={item.alt_description} />
                      <Link to={`/caption/${item.id}`}>
                        <input className="caption" type="button" value="Add Caption"/>
                      </Link>
                  </div>
                </div>
              )})
            }
          </div>
        </div>
    </>
  )
}
export default Search;