import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Youtubelogo from "./YoutubeLogo.png";

function Details({ token, userName }) {
  let [data, setData] = useState();
  const router = useNavigate();
  useEffect(() => {
    fetchVideos(); // eslint-disable-next-line
  }, []);

  const { id } = useParams();
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ottx/show/${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            projectID: "1slqzy0xqfty",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setData(data.data);
      console.log("data fetch from server");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <nav>
        <img
          src={Youtubelogo}
          alt="YouTube Logo"
          onClick={() => {
            router("/");
          }}
        />
        <h1>
          <i class="fa-solid fa-user fa-sm"></i> {userName}
        </h1>
      </nav>
      {data ? ( // Check if data exists
        <div>
          <div>
            <video src={data.video_url} controls />
            <img src={data.thumbnail} alt="thumbnail of Video" />
          </div>
          <h1>{data.title}</h1>
          <p>description: {data.description} </p>
          {data.keywords.map((keyword, index) => (
            <span key={index}>
              {index > 0 && ", "}#{keyword}
            </span>
          ))}
          <br />
          <br />
          Type: {data.type}
          <br />
          Director: {data.director}
          <br />
          Cast: {data.cast.join(", ")}
        </div>
      ) : (
        <h1>No data</h1> // Render if data is null or undefined
      )}
    </>
  );
}

export default Details;
