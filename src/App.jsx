import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainComponent from './myComponents/MainComponent'
import Login from './myComponents/Login'
import Profile from './myComponents/Profile'
import appStore from './utils/appStore'
import {Provider} from 'react-redux'
import Feed from './myComponents/Feed'
import Connections from './myComponents/Connections'
import Requests from './myComponents/Requests'


function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<MainComponent/>}>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/connections' element={<Connections/>}/>
            <Route path='/requests' element={<Requests/>}/>
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
