import { API_BASE_URL } from '../config';
import type { Student, Club } from '../types';

export const getStudents = async (): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/etudiants`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data;
};

export const createStudent = async (student: Omit<Student, 'id' | 'createdAt'>): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/etudiants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.student;
};

export const getClubs = async (): Promise<Club[]> => {
    const response = await fetch(`${API_BASE_URL}/clubs`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data;
};

export const createClub = async (club: { name: string; description: string; presidentId: number }): Promise<Club> => {
    const response = await fetch(`${API_BASE_URL}/clubs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(club),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du club');
    }
    return response.json();
};
