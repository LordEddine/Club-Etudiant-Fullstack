import { useEffect, useState } from 'react';
import type { Club } from '../types';
import { getClubs } from '../services/api';

const ClubList = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const data = await getClubs();
                setClubs(data);
            } catch (err) {
                setError('Erreur lors du chargement des clubs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (loading) return <p>Chargement des clubs...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Liste des Clubs</h2>
            <ul>
                {clubs.map((club) => (
                    <li key={club.id}>
                        <strong>{club.name}</strong>: {club.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClubList;
