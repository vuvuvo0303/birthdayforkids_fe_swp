import './App.css';
import Navigation from './components/Navigation';
import ViewListServices from './components/ViewListServices';
import ManageService from './components/ManageServices';
import Decription from './components/Decription';
import {
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/service' element={<ManageService />}></Route>
        <Route path='/services' element={<ViewListServices />}></Route>
        <Route path='/detail/:id' element={<Decription />}></Route>
      </Routes>
    </div>
  );
}

export default App;
