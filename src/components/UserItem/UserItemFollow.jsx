import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button} from "@material-ui/core";
import "./UserItemFollow.css";
import { useStateValue } from "../../contexts/StateContextProvider";
import { unfollow, follow } from "../../server/serverActions";

const UserItemFollow = ({ display }) => {
  const [{ user }] = useStateValue();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFollowing(display.followers.includes(user.id));
    }
  }, [display]);

  return (
    <>
      <div className="userItemFollow--user__item">
        <Avatar src={display && display.photoURL} />
        <div className="userItemFollow--user__details">
          <Link to={display ? `/profile/${display.username}` : `/notfound`}>
            <h2>{display ? display.displayName : "Empty"}</h2>{" "}
          </Link>

          <span>{display ? `@${display.username}` : "empty"}</span>
        </div>

        {isFollowing ? (
          <Button  variant="outlined" onClick={() => unfollow(user.id,display.id)}>Followed</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => follow(user.id,display.id)}>Follow</Button>
        )}
      </div>
    </>
  );
};

export default UserItemFollow;
