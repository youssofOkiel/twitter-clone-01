import React from "react";
import FlipMove from "react-flip-move";
import Tweet from "../Tweet/Tweet";

const Tweets = ({ tweets }) => {
  return (
    <>
      <FlipMove>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            postId={tweet.id}
            altText={tweet.altText}
            senderId={tweet.senderId}
            username={tweet.username}  
            text={tweet.text}
            avatar={tweet.avatar}
            image={tweet.image}
            timestamp={tweet.timestamp}
            likes={tweet.likes}
          />
        ))}
      </FlipMove>
    </>
  );
};

export default Tweets;
