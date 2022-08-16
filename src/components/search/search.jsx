import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./search.css";
import db from "../../firebase";
import UserItemFollow from "../UserItem/UserItemFollow";
import { useStateValue } from "../../contexts/StateContextProvider";

const Search = () => {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);
  const profile = localStorage.getItem("twitter_user");

  const getname = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (searchName != "") {
      db.collection("users")
        .where("displayName", ">", searchName)
        .limit(3)
        .onSnapshot((snapshot) => {
          setUsers(
            snapshot.docs.map((user) => ({
              id: user.id,
              ...user.data(),
            }))
          );
        });
    }
  }, [searchName]);

  return (
    <>
      <div className="search_container">
        <TextField
          InputLabelProps={{ style: { fontSize: 13 } }}
          placeholder="search"
          size="small"
          InputProps={{ style: { fontSize: 13, borderRadius: "2rem" } }}
          fullWidth
          value={searchName}
          onChange={(e) => getname(e)}
          onEmptied={() => {
            setSearchName("");
          }}
          variant="outlined"
          id="fullWidth"
        />
      </div>
      <div className="users_container">
        {users.length > 0 &&
          users.map((user) => {
            if (searchName != "") {
              if (user.displayName != JSON.parse(profile).displayName) {
                return <UserItemFollow display={user} />;
              }
            }
          })}
      </div>
    </>
  );
};

export default Search;
