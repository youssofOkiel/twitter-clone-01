import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentTwoTone from "@material-ui/icons/InsertCommentTwoTone";
import { useStateValue } from "../../contexts/StateContextProvider";
import Popover from "@material-ui/core/Popover";
import "./like.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Like = ({ likes, likeAction, unlikeAction, comments }) => {
  const [{ user }] = useStateValue();
  const [isLiked, setisLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const onClickExpand = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;

  useEffect(() => {
    if (user.id && likes) {
      if (likes.includes(user.id)) {
        setisLiked(true);
      } else {
        setisLiked(false);
      }
    }
  }, [likes]);

  useEffect(() => {});

  return (
    <div className="footerIcon_wrapper">
      {isLiked ? (
        <span className="liked" onClick={unlikeAction}>
          <FavoriteIcon />
        </span>
      ) : (
        <span className="unliked" onClick={likeAction}>
          <FavoriteBorderIcon />
        </span>
      )}
      <span className="like__counter">{likes.length > 0 && likes.length}</span>

      <div onClick={onClickExpand}>
        {comments.length <= 0 ? (
          <></>
        ) : (
          <>
            <span className="comment">
              <InsertCommentTwoTone />
            </span>
            <span className="comment__counter">{comments.length}</span>
          </>
        )}
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
        <ul className="comment__expandList">
          {comments.map((comment, i) => {
            return (
              <li key={i}>
                <Avatar
                  src={comment.sender.photoURL}
                  style={{ marginRight: "10px" }}
                />
                <Link
                  style={{ color: "black" }}
                  to={`/profile/${comment.sender.username}`}
                >
                  <h4 style={{ marginRight: "12px" }}>
                    {comment.sender.displayName}
                  </h4>
                </Link>
                {"  "}
                {comment.text}
              </li>
            );
          })}
        </ul>
      </Popover>
    </div>
  );
};

export default Like;
