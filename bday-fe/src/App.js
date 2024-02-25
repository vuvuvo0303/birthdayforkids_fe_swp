import './App.css';
import Navigation from './components/Navigation';
import ViewListServices from './components/ViewListServices';
import ManageService from './components/ManageServices';
import ServiceDecription from './components/ServiceDecription';
import PackageDecription from './components/PackageDecription';
import {
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<ViewListServices />}></Route>
        <Route path='/home' element={<ViewListServices />}></Route>
        <Route path='/service' element={<ManageService />}></Route>
        <Route path='/serviceDetail/:id' element={<ServiceDecription />}></Route>
        <Route path='/packageDetail/:id' element={<PackageDecription />}></Route>
      </Routes>
    </div>
  );
}

export default App;
