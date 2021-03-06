import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineReload } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

const PrivatAside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.posts);
  const { data } = posts;
  console.log(data);

  const { events } = useSelector((state) => state.events);
  const { data: files } = events;

  const { user } = useSelector((state) => state.auth);

  const refreshPage = () => {
    window.location.reload();
  };

  const postConversation = async (userId) => {
    const res = await axios
      .post("http://localhost:2300/api/conversation", {
        senderId: user._id,
        receiverId: userId,
      })
      .catch((error) => console.log(error));
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleConversation = (userId) => {
    postConversation(userId)
      .then((data) => console.log(data))
      .then(navigate("/messenger"));
  };

  return (
    <div className="aside aside__profiles">
      <AiOutlineReload onClick={refreshPage} />
      {data &&
        data
          .filter((post) => post.creator.selectedRole === "newcomer")
          .sort((a, b) => a.createdAt > b.createdAt)
          .reverse()
          .map((post) => (
            <div className="comer-container">
              <div className="newComer-profile">
                <div className="newComer-foto">
                  <img src={post.creator.profilePicture} alt="profile foto" />
                  <div className="column-flex">
                    <p>{post.creator.username}</p>
                    <p>{post.creator.selectedRole}</p>
                    <p>Berlin</p>
                  </div>
                </div>
                <div className="newComer-text">
                  <p>{post.message}</p>
                </div>
              </div>
              <div className="btn btn-profile">
                <button onClick={() => handleConversation(post.creator._id)}>
                  Contact
                </button>
                <button>I can't help</button>
              </div>
            </div>
          ))}
      <div className="newcomer__events__card">
        {files &&
          files
            .map((event) => (
              <div className="event__container" key={event._id}>
                <div className="event__content">
                  <div className="event__image">
                    <img src={event.profilePicture} alt="event picture" />
                  </div>
                  {/* <div className="event__header">
                    <h3>Event</h3>
                  </div> */}
                  <div className="event__menu">
                    <div className="date__time__flex">
                      <div className="event event__date">
                        <p>{event.date}</p>
                      </div>
                      <div className="event event__time">
                        <p>{event.time}</p>
                      </div>
                    </div>
                    <div className="event event__description">
                      <h3>{event.description}</h3>
                    </div>
                    <div className="event event__address">
                      <GoLocation color="#34475C" size={18} />
                      <p>{event.address}</p>
                    </div>
                  </div>
                  <div className="btn btn-profile">
                    <button className="interessted__btn">Interested</button>
                    <button className="not__interessted__btn">
                      Not interessted
                    </button>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
      </div>
    </div>
  );
};

export default PrivatAside;
