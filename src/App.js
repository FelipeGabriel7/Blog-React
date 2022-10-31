// Router 
import { BrowserRouter as Container, Routes, Route, Navigate } from 'react-router-dom';

// styles
import './App.css'

// pages 
import { About } from './pages/About/About';
import { Home } from './pages/home/Home';

// components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Post } from './pages/Post/Post';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { NotFound } from './pages/NotFound/NotFound';

// context
import { AuthProviderContext } from './context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth';
import { PostDetails } from './components/PostDetails';
import { Search } from './pages/search/Search';
import { Edit } from './pages/Edit/Edit';


function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();


  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

  }, [auth])

  if (loadingUser) {
    return (<p> Carregando Aguarde... </p>);
  }


  return (
    <div>
      <AuthProviderContext user={{ user }}>
        <Container>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="*" element={<NotFound/>} />
              <Route path="/" exact element={ <Home /> } />
              <Route path="/about" element={ <About /> } />
              <Route path="/login" element={!user ? <Login/>  : <Navigate to="/" /> } />
              <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>} />
              <Route path="/post/:id" element={ <PostDetails/> }/>
              <Route path="/search" element={<Search/>} />
              <Route path="/post" element={user ? <Post/> : <Navigate to="/login"/>}/>
              <Route path="/post/edit/:id" element={user ? <Edit/> : <Navigate to="/login"/> }/>
              <Route path="/dashboard" element={user ? < Dashboard/> : <Navigate to="/login"/>}/>
            </Routes>
          </div>
          <Footer />
        </Container>
      </AuthProviderContext>
    </div>
  );
}

export default App;
