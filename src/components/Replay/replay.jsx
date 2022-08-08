import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-ui/core";
import { useStateValue } from "../../contexts/StateContextProvider";
import db from "../../firebase";
import Popover from "@material-ui/core/Popover";
import "./replay.css";
import Spinner from "../elements/Spinner/Spinner";
const Replay = ({ postId }) => {
  const [{ user }] = useStateValue();
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;

  useEffect(() => {}, []);

  const addComment = (e) => {
    e.preventDefault();

    if (commentText.length > 0) {
      setIsLoading(true);
      db.collection("comments").add({
        sender: user,
        tweetId: postId,
        text: commentText,
      });
      setCommentText("");
      setIsLoading(false);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <>
      <div className="replay">
        <form onSubmit={addComment}>
          <Input
            placeholder="enter your replay"
            type="text"
            className="replayInput"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          ><p className="warning__comment">write your replay first</p></Popover>
          {isLoading ? (
            <Button className="ReplayButton" type="submit">
              <Spinner />
            </Button>
          ) : (
            <Button className="ReplayButton" type="submit">
              replay
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default Replay;
