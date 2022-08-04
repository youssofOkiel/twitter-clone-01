import React, { useState, forwardRef, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "./Tweet.css";
import db from "../../firebase";
import { useStateValue } from "../../contexts/StateContextProvider";
import { follow, unfollow, deletePost , like , unlike } from "../../server/serverActions";
import TweetPostTime from "../../helpers/timeHandle";
import Like from "../like/like";

const Tweet = forwardRef(
  ({ altText, text, image, timestamp, senderId, postId , likes }, ref) => {
    const d = new Date();
    const [anchorEl, setAnchorEl] = useState(null);
    const onClickExpand = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? "post-popover" : undefined;
    const [{ user }] = useStateValue();
    const [profile, setProfile] = useState({
      id: "",
      displayName: "",
      photoURL: "",
      verified: false,
      username: "",
      followers: [],
      following: [],
    });
    const { displayName, username, photoURL, verified } = profile;
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
      db.collection("users")
        .doc(senderId)
        .onSnapshot((snapshot) => {
          setProfile(snapshot.data());
        });
    }, []);

    useEffect(() => {
      if (profile) {
        setIsFollowing(profile.followers.includes(user.id));
      }
    }, [profile]);

    return (
      <>
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src={photoURL} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {displayName}{" "}
                  <span className="post__headerSpecial">
                    {verified && <VerifiedUserIcon className="post__badge" />}@
                    {`${username} . ${TweetPostTime(
                      timestamp,
                      d.toLocaleString()
                    )}`}
                  </span>
                </h3>
                <div
                  className="post__headerExpandIcon"
                  aria-describedby={id}
                  variant="contained"
                  onClick={onClickExpand}
                >
                  <ExpandMoreIcon />
                </div>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ul className="post__expandList">
                    {senderId === user.id ? (
                      <>
                        <li onClick={() => deletePost(postId)}>
                          <div className="delete">
                            <DeleteOutlineIcon />
                          </div>
                          <h3 className="delete">Delete</h3>
                        </li>
                      </>
                    ) : (
                      <>
                        {isFollowing ? (
                          <li onClick={() => unfollow(user.id, senderId)}>
                            <div>
                              <PersonAddDisabledIcon />
                            </div>
                            <h3>Unfollow {`@${username}`}</h3>
                          </li>
                        ) : (
                          <li onClick={() => follow(user.id, senderId)}>
                            <div>
                              <PersonAddIcon />
                            </div>
                            <h3>Follow {`@${username}`}</h3>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </Popover>
              </div>

              <div className="post__headerDescription">
                <p> {text} </p>
              </div>
            </div>

            {image.length > 0 && (
              <img src={image} alt={altText} />
            )}

            <div className="post__footer">
            <Like 
                        likes={likes}
                        unlikeAction = {()=>unlike(postId, user.id)}
                        likeAction = {()=>like(postId, user.id)}
                  />
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Tweet;
