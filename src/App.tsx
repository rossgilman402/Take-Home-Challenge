import { useState } from "react";

function App() {
  //Fetch Data
  const fetchPetData = async () => {
    const response = await fetch("https://eulerity-hackathon.appspot.com/pets");
    const data = await response.json();
    console.log(data);
  };
  fetchPetData();

  return <></>;
}

export default App;
