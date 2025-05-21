import { Routes, Route, Link } from 'react-router-dom';
import PatientRegistration from './components/PatientRegistration';
import QueryView from './components/QueryView';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Register Patient</Link>
          </li>
          <li>
            <Link to="/query">Query Database</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<PatientRegistration />} />
          <Route path="/query" element={<QueryView />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
