import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setdata] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    let result = await fetch("https://backend-nai0.onrender.com/api/v1/getdata");
    result = await result.json();
    setdata(result);
    console.log(result);
  }

  async function handleThumbnailClick(id) {
    console.log("Clicked ID:", id);
    const videoId = await fetch("https://backend-nai0.onrender.com/api/v1/get-video-id", {
      method: "post",
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': "application/json"
      }
    });
    const res = await videoId.json();
    console.log(res);
    nav(`/video/${res.videoId}`);
  }

  return (
    <div className="container">
      <div className="thumbnails">
        {data.map((element) => (
          <div key={element.id} className="thumbnail">
            <img
              src={element.imageUrl}
              alt={element.title}
              className="image"
              onClick={() => handleThumbnailClick(element.id)}
            />
            <p className="title">{element.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
