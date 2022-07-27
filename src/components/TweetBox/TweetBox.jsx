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

const TweetBox = () => {
  const d = new Date();
  const [{ user }] = useStateValue();
  const [profile, setProfile] = useState(null);
  const [tweetMessage, setTweetMessage] = useState("");
  const [imageToSend, setImageToSend] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(user.id)
      .onSnapshot((snapshot) => {
        setProfile(snapshot.data());
      });
  }, []);

  const sendTweet = (e) => {
    e.preventDefault();
    setIsloading(true);

    if (imageToSend !== "") {
      db.collection("posts").add({
        altText: imageToSend,
        text: tweetMessage,
        image: `assets/${imageToSend}`,
        likes: [],
        senderId: user.id,
        timestamp: d.toLocaleString(),
      });

      setTweetMessage("");
      setIsloading(false);
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
  };

  const onSelectFile = (e) => {
    setImageToSend(e.target.value.split("\\")[2]);
  };

  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;
  const onClickEmoticon = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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

                  {/* <Input Icon={EventNoteSharpIcon} /> */}
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
