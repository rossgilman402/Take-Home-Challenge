import { useFetch } from ".././utils/useFetch";

type Pet = {
  id: Number;
  created: String;
  description: String;
  title: String;
  url: String;
};

function App() {
  //Fetch Data

  const url = "https://eulerity-hackathon.appspot.com/pets";
  const { data, error, loading } = useFetch<Pet[]>(url);
  console.log(data);

  return <></>;
}

export default App;
