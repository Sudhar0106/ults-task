import React, { useEffect, useState } from "react";
import PageLoader from "./loader";

const UserList = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://api.example.com/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("There is an error", err);
    }
  };

  const renderUserProfile = (profile) => {
    return <div dangerouslySetInnerHTML={{ __html: profile }} />;
  };

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            {renderUserProfile(user.profile)}
            <button
              onClick={() => {
                fetch(`/api/users/${user.id}/activate`, { method: "POST" })
                  .then((response) => response.json())
                  .then((data) => console.log(data));
              }}
            >
              Activate User
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
