import { useEffect, useState } from 'react';
import type { Student } from '../types';
import { getStudents } from '../services/api';

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (err) {
            setError('Erreur lors du chargement des étudiants');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return <p>Chargement des étudiants...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Liste des Étudiants</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} ({student.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
