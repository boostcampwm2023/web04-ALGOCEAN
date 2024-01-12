import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, <App />);
} else {
  root.render(<App />);
}
