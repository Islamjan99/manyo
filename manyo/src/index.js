import { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BasketStore from './store/FavoritesStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      FavoritesStore: new BasketStore(),
    }}>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);

