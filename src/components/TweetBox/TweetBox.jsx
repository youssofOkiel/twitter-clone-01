import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { useStateValue } from "../../contexts/StateContextProvider";
import db from "../../firebase";
import "./TweetBox.css";

import Popover from "@material-ui/core/Popover";
import Picker from "emoji-picker-react";
import StatusInput from "../StatusInput/StatusInput";
import Spinner from "../elements/Spinner/Spinner";

import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Image from "../../helpers/uploadCloudImage";

const TweetBox = () => {
  const d = new Date();
  const [{ user }] = useStateValue();
  const [profile, setProfile] = useState(null);
  const [tweetMessage, setTweetMessage] = useState("");
  const [imageToSend, setImageToSend] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClose2 = () => setAnchorEl2(null);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? "post-popover" : undefined;
  const id2 = open2 ? "post-popover" : undefined;
  useEffect(() => {
    db.collection("users")
      .doc(user.id)
      .onSnapshot((snapshot) => {
        setProfile(snapshot.data());
      });
  }, []);

  const sendTweet = (e) => {
    e.preventDefault();
if(tweetMessage.length > 0){
  setIsloading(true);
  if (imageToSend !== "") {
    console.log("imageToSend", imageToSend);
    Image(imageToSend)
      .then((res) => {
        db.collection("posts").add({
          altText: "hi",
          text: tweetMessage,
          image: res,
          likes: [],
          senderId: user.id,
          timestamp: d.toLocaleString(),
        });

        setTweetMessage("");
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        return;
      });
  } else {
    db.collection("posts").add({
      altText: "no_images",
      text: tweetMessage,
      image: "",
      likes: [],
      senderId: user.id,
      timestamp: d.toLocaleString(),
    });

    setTweetMessage("");
    setIsloading(false);
  }
}else{
  setAnchorEl2(e.currentTarget)
}

  };

  const onSelectFile = (e) => {
    var image = e.target.files[0];
    setImageToSend(image);
  };

  const onClickEmoticon = (event) => setAnchorEl(event.currentTarget);
  const onEmojiClick = (event, emojiObject) => {
    let newMessage = tweetMessage + emojiObject.emoji;
    setTweetMessage(newMessage);
  };

  useEffect(() => {
    var textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", autosize);

    function autosize() {
      var el = this;
      setTimeout(function () {
        el.style.cssText = "height:auto padding:0";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    }
  }, []);

  return (
    <>
      <div className="tweetBox">
        <form onSubmit={sendTweet}>
          <div className="tweetBox__wrapperInput">
            <div className="tweetBox__ava">
              <Avatar src={profile && profile.photoURL} />
            </div>

            <div className="tweetBox__input">
              <textarea
                rows="1"
                placeholder="What's happening"
                type="text"
                value={tweetMessage}
                onChange={(e) => setTweetMessage(e.target.value)}
              ></textarea>

              <div className="tweetBox__input-actions">
                <div className="tweetBox__input-icons">
                  <StatusInput
                    Icon={ImageOutlinedIcon}
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input-image"
                    onChange={onSelectFile}
                  />
                  <StatusInput
                    Icon={SentimentSatisfiedOutlinedIcon}
                    aria-describedby={id}
                    type="button"
                    onClick={onClickEmoticon}
                  />
                  <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl2}
                    onClose={handleClose2}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <p className="warning__tweet">write your Tweet first</p>
                  </Popover>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    style={{ borderRadius: "2rem" }}
                  >
                    <Picker onEmojiClick={onEmojiClick} />
                  </Popover>
                </div>

                {isLoading ? (
                  <Button className="tweetBox__tweetButton">
                    <Spinner />
                  </Button>
                ) : (
                  <Button type="submit" className="tweetBox__tweetButton">
                    Tweet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TweetBox;
