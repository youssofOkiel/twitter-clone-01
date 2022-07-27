import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import PlaceIcon from "@material-ui/icons/Place";
import DateRangeIcon from "@material-ui/icons/DateRange";
import db from "../../firebase";
import { useStateValue } from "../../contexts/StateContextProvider";
import { follow, unfollow } from "../../server/serverActions";

import "./ProfileTheme.css";
import { Avatar } from "@material-ui/core";

const ProfileTheme = () => {
  const [profile, setProfile] = useState({
    bio: "",
    displayName: "",
    followers: [],
    following: [],
    location: "",
    photoURL: "",
    website: "",
  });

  const [{ user }] = useStateValue();
  const { username } = useParams();
  let isMe = (profile && profile.id) === user.id ? true : false;
  const [isFollowing, setIsFollowing] = useState(false);

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
    if (profile) {
      if (!isMe) {
        setIsFollowing(profile.followers.includes(user.id));
      }
    }
  }, [profile]);

  return (
    <>
      <div className="userProfile">
        <div
          className="userProfile__theme"
          style={{ backgroundImage: `url(${profile && profile.wallpaper})` }}
        >
          <div className="photoWrapper">
            {profile.photoURL != "" ?
              <img src={profile.photoURL} alt={`${profile.displayName}`} />
            : <Avatar style={{width:'14rem' , height:'14rem'}} src={profile.photoURL} />
            }
           
          </div>
        </div>

        <div className="infoWrapper">
          <div className="userProfile__actions">
            <div className="moreWrapper">
              {isMe ? (
                <div className="followWrapper">Edit Profile</div>
              ) : isFollowing ? (
                <div
                  className="followWrapper"
                  onClick={() => unfollow(user.id, profile.id)}
                >
                  Followed
                </div>
              ) : (
                <div
                  className="followWrapper"
                  onClick={() => follow(user.id, profile.id)}
                >
                  Follow
                </div>
              )}
            </div>
          </div>

          <h2>{profile && profile.displayName}</h2>
          {username && <span>{`@${username}`}</span>}
          {profile && <p>{profile.bio}</p>}

          <div className="bioInfo">
            {profile && profile.location && (
              <div>
                {" "}
                <PlaceIcon /> <span>{profile.location}</span>
              </div>
            )}
            {profile && profile.website && (
              <div className="blued">
                {" "}
                <InsertLinkIcon /> <span>{profile.website}</span>
              </div>
            )}
            <div>
              <DateRangeIcon /> <span>Sep 2020</span>
            </div>
          </div>

          <div className="countInfo">
            <Link to={`/profile/${username}/followinfo`}>
              <span>
                {profile && profile.following.length} <p>Following</p>
              </span>
            </Link>
            <Link to={`/profile/${username}/followinfo`}>
              <span>
                {profile !== undefined && profile.followers.length}{" "}
                <p>Followers</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTheme;
