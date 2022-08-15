// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import our custom CSS
import '../scss/main.scss'
import { filterEvents } from './components/filters';
import { initFunctions } from './components/recipes';

filterEvents();
initFunctions();

