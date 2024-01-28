import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const MyNavBar = () => {
  const selectedSong = useSelector((state) => state.reducer.selectedSong);

  useEffect(() => {
    // Avvia la riproduzione quando selectedSong cambia
    if (selectedSong) {
      const audioElement = document.getElementById("customAudioPlayer");
      if (audioElement) {
        audioElement.load(); // Carica nuovamente l'elemento audio
        audioElement.play(); // Avvia la riproduzione
      }
    }
  }, [selectedSong]);

  return (
    <>
      <div className="col-6 col-md-4">
        {/* ... altri controlli ... */}
        {selectedSong && (
          <audio controls id="customAudioPlayer" className="audio-player mt-2 play">
            <source src={selectedSong.preview} type="audio/mpeg" />
            Il tuo browser non supporta l'elemento audio.
          </audio>
        )}
      </div>
    </>
  );
};

export default MyNavBar;
