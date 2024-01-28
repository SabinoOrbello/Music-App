import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MyNavBar from "./components/MyNavBar";

import MuscSection from "./components/MusicSection";
import Home from "./components/Home";

function App() {
  return (
    <Container>
      <Row>
        <div className="col-8 col-md-4">
          <Home />
        </div>
        <div className="col-12 col-md-6">
          <MuscSection />
        </div>
        <div></div>
      </Row>
    </Container>
  );
}

export default App;
