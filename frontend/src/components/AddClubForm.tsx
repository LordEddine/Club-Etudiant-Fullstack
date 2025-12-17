import { useState, useEffect } from 'react';
import { createClub, getStudents, getClubs } from '../services/api';
import type { Student, Club } from '../types';

interface Props {
    onClubAdded: () => void;
}

const AddClubForm = ({ onClubAdded }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [presidentId, setPresidentId] = useState<number | ''>('');
    const [students, setStudents] = useState<Student[]>([]);
    const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsData, clubsData] = await Promise.all([
                    getStudents(),
                    getClubs()
                ]);
                setStudents(studentsData);

                // Filtrer les étudiants qui sont déjà présidents
                // On suppose qu'un étudiant ne peut être président que d'un seul club
                const presidentIds = new Set(clubsData.map(club => club.presidentId));
                const available = studentsData.filter(student => !presidentIds.has(student.id));
                setAvailableStudents(available);

            } catch (error) {
                console.error("Erreur lors du chargement des données", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (presidentId === '') {
            alert('Veuillez sélectionner un président');
            return;
        }

        try {
            await createClub({
                name,
                description,
                presidentId: Number(presidentId)
            });
            setName('');
            setDescription('');
            setPresidentId('');
            onClubAdded();
            alert('Club créé avec succès !');

            // Mettre à jour la liste des étudiants disponibles sans recharger tout
            setAvailableStudents(prev => prev.filter(s => s.id !== Number(presidentId)));

        } catch (error: any) {
            console.error(error);
            alert(error.message || "Erreur lors de la création du club");
        }
    };

    if (loading) return <p>Chargement du formulaire...</p>;

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>Créer un nouveau club</h3>
            <div>
                <label>Nom du club: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginBottom: '10px', display: 'block' }}
                />
            </div>
            <div>
                <label>Description: </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ marginBottom: '10px', display: 'block', width: '100%' }}
                />
            </div>
            <div>
                <label>Président: </label>
                <select
                    value={presidentId}
                    onChange={(e) => setPresidentId(Number(e.target.value))}
                    required
                    style={{ marginBottom: '10px', display: 'block' }}
                >
                    <option value="">-- Sélectionner un étudiant --</option>
                    {availableStudents.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name} ({student.email})
                        </option>
                    ))}
                </select>
                {availableStudents.length === 0 && <p style={{ color: 'orange' }}>Aucun étudiant éligible (tous sont déjà présidents ou aucun étudiant existant).</p>}
            </div>
            <button type="submit">Créer le Club</button>
        </form>
    );
};

export default AddClubForm;
