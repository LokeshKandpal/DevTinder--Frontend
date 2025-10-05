import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Landing from './components/Landing';
import Login from './components/Login';
import Body from './components/Body';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Requests from './components/Requests';
import UserProfileView from './components/UserProfileView';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes with NavBar */}
          <Route element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/user/:userId" element={<UserProfileView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
