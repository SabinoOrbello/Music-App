import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchArtist, setSelectedSong, toggleHeart } from "../redux/actions/action";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import MyNavBar from "./MyNavBar";
import logo from "../assets/logo/logo.png";
const Home = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.reducer.searchResults);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedSong = useSelector((state) => state.reducer.selectedSong);
  const heartStates = useSelector((state) => state.heart);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      dispatch(searchArtist(searchQuery));
    }
  };

  const handleSongClick = (selectedSong) => {
    dispatch(setSelectedSong(selectedSong));
  };

  const toggleHeartState = (cardId) => {
    dispatch(toggleHeart(cardId));
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
          <div className="container flex-column align-items-start">
            <img src={logo} alt="" style={{ width: "200px" }} />
            <form className="input-group mt-3" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                id="searchField"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                  GO
                </button>
              </div>
            </form>
          </div>
        </nav>
      </div>
      <h2>Player</h2>
      {selectedSong && (
        <>
          <div>
            <Card style={{ width: "18rem", backgroundColor: "#3d5983" }}>
              <Card.Img variant="top" src={selectedSong.album.cover_xl} />
              <Card.Body>
                <Card.Title>{selectedSong.album.title}</Card.Title>
                <Card.Text>Artist: {selectedSong.artist.name}</Card.Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill={heartStates[selectedSong] ? "green" : "currentColor"}
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                  onClick={() => toggleHeartState(selectedSong)}
                  style={{ cursor: "pointer" }}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                <MyNavBar />
              </Card.Body>
            </Card>
          </div>
        </>
      )}

      <div className="col col-10">
        {searchResults && searchResults.data && (
          <div className="container mt-3">
            <Badge bg="primary fs-4 mb-2">Search Results</Badge>
            <div className="d-flex flex-row flex-wrap gap-2 ">
              {searchResults.data.slice(0, 6).map((item) => (
                <Card
                  style={{ width: "18rem", backgroundColor: "#3d5983" }}
                  key={item.id}
                  onClick={() => handleSongClick(item)}
                >
                  <Card.Img variant="top" src={item.album.cover_xl} />
                  <Card.Body>
                    <Card.Title>{item.album.title}</Card.Title>
                    <Card.Text>
                      name artist: <Badge bg="secondary">{item.artist.name}</Badge>
                    </Card.Text>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill={heartStates[item.id] ? "green" : "currentColor"}
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                      onClick={() => toggleHeartState(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <div></div>
    </>
  );
};
export default Home;
