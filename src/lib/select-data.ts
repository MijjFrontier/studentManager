import type { Campus, StudyProgram, AcademicPeriod } from './types';

const campuses: Campus[] = [
    { id: 'campus-1', name: 'Sede Central' },
    { id: 'campus-2', name: 'Campus Norte' },
    { id: 'campus-3', name: 'Campus Sur' },
    { id: 'campus-4', name: 'Sede Virtual 100%' },
];

const studyPrograms: StudyProgram[] = [
    { id: 'prog-1', name: 'Desarrollo de Sistemas Front-end y Back-end' },
    { id: 'prog-2', name: 'Ingeniería de Software con IA' },
    { id: 'prog-3', name: 'Diseño Gráfico Digital' },
    { id: 'prog-4', name: 'Administración de Empresas' },
    { id: 'prog-5', name: 'Marketing Digital' },
];

const academicPeriods: AcademicPeriod[] = [
    { id: 'period-1', name: 'Primer Periodo Académico' },
    { id: 'period-2', name: 'Segundo Periodo Académico' },
    { id: 'period-3', name: 'Tercer Periodo Académico' },
    { id: 'period-4', name: 'Cuarto Periodo Académico' },
    { id: 'period-5', name: 'Quinto Periodo Académico' },
    { id: 'period-6', name: 'Sexto Periodo Académico' },
];

const simulateLatency = (ms: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function getCampuses(): Promise<Campus[]> {
    await simulateLatency();
    return campuses;
}

export async function getStudyPrograms(): Promise<StudyProgram[]> {
    await simulateLatency();
    return studyPrograms;
}

export async function getAcademicPeriods(): Promise<AcademicPeriod[]> {
    await simulateLatency();
    return academicPeriods;
}
