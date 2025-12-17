import { useState } from 'react';
import { createStudent } from '../services/api';

interface Props {
    onStudentAdded: () => void;
}

const AddStudentForm = ({ onStudentAdded }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createStudent({ name, email });
            setName('');
            setEmail('');
            onStudentAdded(); // Rafraîchir la liste
            alert('Étudiant ajouté avec succès !');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout de l'étudiant");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>Ajouter un étudiant</h3>
            <div>
                <label>Nom: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Ajouter</button>
        </form>
    );
};

export default AddStudentForm;
