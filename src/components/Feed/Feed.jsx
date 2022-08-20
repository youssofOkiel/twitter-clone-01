import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { Avatar } from "@material-ui/core";
import Loader from "../elements/Loader/Loader";
import "./Feed.css";
import { useStateValue } from "../../contexts/StateContextProvider";
import Tweets from "../Tweets/Tweets";
import TweetBox from "../TweetBox/TweetBox";

const Feed = () => {
  const [{ user }] = useStateValue();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user.id)
      .onSnapshot((snapshot) => {
        setProfile(snapshot.data());
        setFollowing(snapshot.data() && snapshot.data().following);
      });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .where("senderId", "in", [user.id, ...following])
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setLoading(false);
            return;
          }
          setTweets(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );

          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  });

  return (
    <div className="feed">
      <div className="feed__header">
        <div className="feed__header-ava">
          <Avatar src={profile && profile.photoURL} />
        </div>
        <h2>Home</h2>
      </div>
      <TweetBox />
      {loading && (
        <div className="feed__loader">
          <Loader />
        </div>
      )}
      <Tweets tweets={tweets} />
    </div>
  );
};

export default Feed;
