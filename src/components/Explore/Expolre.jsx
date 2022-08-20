import React, { useState, useEffect } from "react";
import db from "../../firebase";
import "./Explore.css";
import Loader from "../elements/Loader/Loader";

const Explore = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("news").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setLoading(false);
          return;
        }

        setNews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  });

  return (
    <>
      <div className="feed">
        {loading && (
          <div className="feed__loader">
            <Loader />
          </div>
        )}
        {news.map((news) => (
          <div className="post">
            <div className="post__body">
              <div className="post__header">
                <div className="post__headerDescription">
                  <p> {news.text} </p>
                </div>
              </div>
              {news.image.length > 0 && <img src={news.image} alt={""} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Explore;
