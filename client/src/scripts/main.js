import "babel-polyfill";
import "whatwg-fetch";

import App from "./components/app";

window.addEventListener('load', () => {
    App.init();
});