import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistData, setSelectedSong, toggleHeart } from "../redux/actions/action";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Row, Col } from "react-bootstrap";
import MyNavBar from "./MyNavBar";

const MuscSection = () => {
  const dispatch = useDispatch();
  const firstSection = useSelector((state) => state.reducer.firstSection);
  const secondSection = useSelector((state) => state.reducer.secondSection);
  const thirdSection = useSelector((state) => state.reducer.thirdSection);
  const heartStates = useSelector((state) => state.heart);

  useEffect(() => {
    dispatch(fetchArtistData("radiohead"));
    dispatch(fetchArtistData("placebo"));
    dispatch(fetchArtistData("moderat"));
  }, [dispatch]);

  const handleSongClick = (selectedSong) => {
    dispatch(setSelectedSong(selectedSong));
  };
  const toggleHeartState = (cardId) => {
    dispatch(toggleHeart(cardId));
  };

  const renderSection = (section, artistName) => {
    if (!section) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <div className="container my-3 pb-3 g-2" key={artistName}>
          <Badge bg="primary fs-4 mb-2">{artistName}</Badge>
          <Row xs={1} sm={2} md={3} lg={6} xl={8} className="gap-2">
            {section.data.slice(0, 6).map((item) => (
              <Col key={item.id} className="mx-5">
                <Card
                  style={{ width: "10rem", backgroundColor: "#3d5983", cursor: "pointer" }}
                  onClick={() => handleSongClick(item)}
                >
                  <Card.Img variant="top" src={item.album.cover_xl} />
                  <Card.Body>
                    <Card.Title>{item.album.title}</Card.Title>
                    <Card.Text className="text-truncate" style={{ maxWidth: "100%" }}>
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
              </Col>
            ))}
          </Row>
        </div>
      </>
    );
  };
  return (
    <div>
      {renderSection(firstSection, "radiohead")}
      {renderSection(secondSection, "placebo")}
      {renderSection(thirdSection, "moderat")}
    </div>
  );
};
export default MuscSection;
