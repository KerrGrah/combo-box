import React from 'react';
import ReactDOM from 'react-dom';
import ComboBox from './ComboBox';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(<Provider store={store}><ComboBox /></Provider>, document.getElementById('root'));
registerServiceWorker();
