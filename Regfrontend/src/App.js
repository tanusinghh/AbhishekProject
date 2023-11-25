import logo from './logo.svg';
import './App.css';
import Regform from './components/Regform/Regform';
 
import { BrowserRouter , Routes , Route  } from 'react-router-dom';
import UserTable from './components/UserTable/UserTable';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage';

function App() {
  return (
    <div className="App">
      
      <Routes>
          
       
          <Route path="/" element={<Regform/>}/>
          <Route path="/usertable" element={<UserTable/>}/>
          <Route path="/userdara/:id" element={<UserDetailsPage/>}/>
         </Routes>
    </div>
  );
}

export default App;
