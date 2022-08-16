import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./search.css";
import db from "../../firebase";
import UserItemFollow from "../UserItem/UserItemFollow";

const Search = () => {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);

  const getname = (e) => {
    setSearchName(e.target.value);
    console.log(searchName);
  };

  useEffect(() => {
    db.collection("users")
      .where("displayName", "==", searchName)
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((user) => ({
            id: user.id,
            ...user.data(),
          }))
        );
      });
  }, [searchName]);

  

  return (
    <>
      <div className="search_container">
        <TextField
          InputLabelProps={{ style: { fontSize: 13 } }}
          placeholder="search"
          size="small"
          InputProps={{ style: { fontSize: 13 , borderRadius:'2rem' } }}
          fullWidth
          value={searchName}
          onChange={(e) => getname(e)}
          variant="outlined"
          id="fullWidth"
        />
      </div>
      <div className="users_container">
        {users.length > 0 &&
          users.map((user) => {
            return <UserItemFollow display={user} />;
          })}
      </div>
    </>
  );
};

export default Search;
