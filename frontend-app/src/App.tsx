import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
