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
import { Avatar, Button, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../elements/Modal/Modal";
import StatusInput from "../StatusInput/StatusInput";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Image from "../../helpers/uploadCloudImage";
import { DropzoneArea } from "material-ui-dropzone";

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
  let isMe = profile.id === user.id ? true : false;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageToSend, setImageToSend] = useState("");
  const [wallpaperToSend, setWallpaperToSend] = useState("");

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

  const callbackforModal = () => {};

  const onSelectFile = (e) => {
    var image = e[0];
    setImageToSend(image);
  };
  const onSelectWallpaper = (e) => {
    var image = e[0];
    setWallpaperToSend(image);
  };

  useEffect(() => {
    if (wallpaperToSend !== "") {
      Image(wallpaperToSend)
        .then((res) => {
          console.log("res", res);
          db.collection("users").doc(user.id).update({
            wallpaper: res,
          });
          console.log("res", res);
          console.log("updated");
        })
        .catch((err) => {
          console.log("not updated");
          return;
        });
    }

    if (imageToSend !== "") {
      Image(imageToSend)
        .then((res) => {
          console.log("res", res);
          db.collection("users").doc(user.id).update({
            photoURL: res,
          });
          console.log("res", res);
          console.log("updated");
        })
        .catch((err) => {
          console.log("not updated");
          return;
        });
    }
  }, [imageToSend, wallpaperToSend]);

  return (
    <>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Edit Profile"
        callback={callbackforModal}
        Icon={CloseIcon}
        ButtonText="Save"
      >
        <DropzoneArea
          dropzoneText="Update Wallpaper"
          onChange={onSelectWallpaper}
        />
        <Divider />
        <DropzoneArea
          dropzoneText="Update Profile Photo"
          onChange={onSelectFile}
        />
        ;
      </Modal>

      <div className="userProfile">
        <div
          className="userProfile__theme"
          style={{ backgroundImage: `url(${profile && profile.wallpaper})`, backgroundSize:"100% 100%" }}
        >
          <div className="photoWrapper">
            {profile.photoURL !== "" ? (
              <img src={profile.photoURL} alt={`${profile.displayName}`}  />
            ) : (
              <Avatar
                style={{ width: "14rem", height: "14rem" }}
                src={profile.photoURL}
              />
            )}
          </div>
        </div>

        <div className="infoWrapper">
          <div className="userProfile__actions">
            <div className="moreWrapper">
              {isMe ? (
                <div
                  className="followWrapper"
                  onClick={() => setIsOpenModal(true)}
                >
                  Edit Profile
                </div>
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
                {profile !== undefined && profile.followers.length}
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
