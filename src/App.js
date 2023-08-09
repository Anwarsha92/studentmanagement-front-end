import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Edit from './Pages/Edit';
import PageNotFound from './Pages/PageNotFound';
import Header from './Pages/Header';
import Footer from './Pages/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/profile/:id' element={<Profile/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
