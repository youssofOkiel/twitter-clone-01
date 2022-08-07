import React, { useState, forwardRef, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import "./Tweet.css";
import { Link } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../contexts/StateContextProvider";
import { unfollow, deletePost , like , unlike } from "../../server/serverActions";
import TweetPostTime from "../../helpers/timeHandle";
import Like from "../like/like";
import Replay from './../Replay/replay';

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
    const [comments , setComments] = useState([])

    useEffect(() => {
      db.collection("users")
        .doc(senderId)
        .onSnapshot((snapshot) => {
          setProfile(snapshot.data());
        });
    }, []);

    useEffect(() => {
      db.collection("comments")
      .where("tweetId", "==", postId)
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    },[])


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
                <Link style={{color:'black',fontSize:'15px'}} to={`profile/${username}`}>{displayName}{" "}</Link>
                  <span className="post__headerSpecial">
                    {verified && <CheckCircleIcon className="post__badge" />}@
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
                        
                          <li onClick={() => unfollow(user.id, senderId)}>
                            <div>
                              <PersonAddDisabledIcon />
                            </div>
                            <h3>Unfollow {`@${username}`}</h3>
                          </li>
                         
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
                        comments = {comments}
                        likes={likes}
                        unlikeAction = {()=>unlike(postId, user.id)}
                        likeAction = {()=>like(postId, user.id)}
                  />
            </div>
           
            <Replay postId = {postId}/>     
                
          </div>
        </div>
      </>
    );
  }
);

export default Tweet;
