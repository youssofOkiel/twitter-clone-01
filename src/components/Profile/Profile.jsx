import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Tweets from "../Tweets/Tweets";
import TabbarMenu from "../elements/TabbarMenu/TabbarMenu";
import ProfileTheme from "../ProfileTheme/ProfileTheme";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Loader from "../elements/Loader/Loader";
import db from "../../firebase";
import "../Feed/Feed.css";

const Profile = () => {
  const { username } = useParams();
  const history = useHistory();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const initProfile = {
    bio: "",
    displayName: "",
    followers: [],
    following: [],
    id: "",
    location: "",
    photoURL: "",
    username: "",
    wallpaper: "",
    website: "",
  };
  const [profile, setProfile] = useState(initProfile);

  useEffect(() => {
    db.collection("users")
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        setProfile(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))[0]
        );
      });
  }, [username]);

  useEffect(() => {
    setLoading(true);

    if (profile) {
      db.collection("posts")
        .where("senderId", "==", profile.id)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setTweets(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoading(false);
        });
    }
  }, [profile]);

  const items = [
    {
      id: 0,
      title: "Tweets",
      item: (
        <>
          {loading && (
            <div className="feed__loader">
              <Loader />
            </div>
          )}
          <Tweets tweets={tweets} />
        </>
      ),
    },
  ];

  return (
    <div className="feed">
      <div className="profile__header">
        <div className="profile__backArrow" onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon />
        </div>
        <div className="profile__title">
          <div className="profile__title_title">
            <h2>{profile && profile.displayName}</h2>
            <CheckCircleIcon />
          </div>
          <span>{tweets && tweets.length} tweets</span>
        </div>
      </div>

      <ProfileTheme profile={profile} />

      <TabbarMenu items={items} />
    </div>
  );
};

export default Profile;
