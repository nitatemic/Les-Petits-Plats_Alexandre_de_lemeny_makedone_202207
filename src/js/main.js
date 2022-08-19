// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import our custom CSS
import '../scss/main.scss'
import { filterEvents } from './components/filters';
import { initFunction } from './components/recipes';
filterEvents();
initFunction();

