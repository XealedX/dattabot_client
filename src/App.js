import PokemonTable from "./components/PokemonList";
import Layout from "./components/Layout";
import Register from "./user_account/Register";
import Login from "./user_account/Login"
import Visualize from "./data_visualization/visualize";
import { Routes, Route} from 'react-router-dom';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PokemonTable />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visualize" element={<Visualize />} />
      </Route>
    </Routes>
  )
}

export default App;