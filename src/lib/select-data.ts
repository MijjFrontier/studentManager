import type { Level, Grade, Section } from './types';

const levels: Level[] = [
    { id: 'level-1', name: 'Primaria' },
    { id: 'level-2', name: 'Secundaria' },
];

export const grades = {
    primaria: [
        { id: 'p-grade-1', name: 'Primer Grado' },
        { id: 'p-grade-2', name: 'Segundo Grado' },
        { id: 'p-grade-3', name: 'Tercer Grado' },
        { id: 'p-grade-4', name: 'Cuarto Grado' },
        { id: 'p-grade-5', name: 'Quinto Grado' },
        { id: 'p-grade-6', name: 'Sexto Grado' },
    ],
    secundaria: [
        { id: 's-grade-1', name: 'Primer Grado' },
        { id: 's-grade-2', name: 'Segundo Grado' },
        { id: 's-grade-3', name: 'Tercer Grado' },
        { id: 's-grade-4', name: 'Cuarto Grado' },
        { id: 's-grade-5', name: 'Quinto Grado' },
    ]
};

const sections: Section[] = [
    { id: 'section-a', name: 'A' },
    { id: 'section-b', name: 'B' },
    { id: 'section-c', name: 'C' },
    { id: 'section-d', name: 'D' },
    { id: 'section-e', name: 'E' },
    { id: 'section-f', name: 'F' },
];


const simulateLatency = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function getLevels(): Promise<Level[]> {
    await simulateLatency();
    return levels;
}

export function getGradesByLevel(level: string): Grade[] {
    if (level.toLowerCase() === 'primaria') {
        return grades.primaria;
    }
    if (level.toLowerCase() === 'secundaria') {
        return grades.secundaria;
    }
    return [];
}

export async function getAllGrades(): Promise<Grade[]> {
    await simulateLatency();
    return [...grades.primaria, ...grades.secundaria];
}


export async function getSections(): Promise<Section[]> {
    await simulateLatency();
    return sections;
}
