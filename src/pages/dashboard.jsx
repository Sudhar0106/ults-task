import { useEffect, useState } from "react";
import UserList from "./userList";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.example.com/notifications");
    ws.onmessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="col-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleSearch}
            value={search}
          />
          <span className="input-group-text">
            <Search size={18} color="#1e1e1e" />
          </span>
        </div>
        <Link to='/' className="btn btn-primary">Task - 1</Link>
      </div>
      <UserList searchTerm={search} />
      <div>
        {notifications.map((note, index) => (
          <div key={index}>{note}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
