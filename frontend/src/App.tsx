import { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import ClubList from './components/ClubList';
import AddStudentForm from './components/AddStudentForm';
import AddClubForm from './components/AddClubForm';

function App() {
  // Hack simple pour rafraîchir la liste des étudiants quand on en ajoute un
  const [refreshKey, setRefreshKey] = useState(0);
  const [clubRefreshKey, setClubRefreshKey] = useState(0);

  const handleStudentAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleClubAdded = () => {
    setClubRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Gestion des Clubs Étudiants</h1>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <AddStudentForm onStudentAdded={handleStudentAdded} />
          <StudentList key={refreshKey} />
        </div>

        <div style={{ flex: 1 }}>
          <AddClubForm onClubAdded={handleClubAdded} />
          <ClubList key={clubRefreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
