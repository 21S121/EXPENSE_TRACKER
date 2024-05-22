import React, { useEffect, useState } from "react";
import "./album.css"
import Image from './components/image'
import Title from "./components/title";

export function Album() 
{
  const [data, setData] = useState([]);

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((albums) => setData(albums))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((item) => {
        return (
          <>
            {/* <p key={item.id} >{item.title}</p> */}
            <Title title={item.title} casing="lower" number={123}/>
            <Title title={item.title} casing="upper"/>
            <Title title={item.title}/>
           <Image path={item.url}/>
          </>
        );
      })}
    </div>
  );
}
