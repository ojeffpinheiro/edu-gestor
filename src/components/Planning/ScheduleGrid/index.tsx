import React from 'react';
import { useLessons } from '../../../contexts/LessonsContext';
import { useSchedule } from '../../../contexts/ScheduleContext';
import { DayOfWeek, Shift } from '../../../types/academic/Planning';
import { Grid, Cell, HeaderCell, TimeCell } from './styles';

interface ScheduleGridProps {
    shift: Shift;
    readOnly?: boolean;
    onAddLesson?: (day: DayOfWeek, time: string) => void;
}

// Dados mockados para aulas do professor
const mockLessons = [
    {
        id: 1,
        day: 'Segunda' as DayOfWeek,
        timeSlot: '07:00',
        discipline: 'Matemática',
        shift: 'Manhã' as Shift,
        classGroup: '8º Ano A',
        room: 'Sala 12'
    },
    {
        id: 2,
        day: 'Segunda' as DayOfWeek,
        timeSlot: '08:50',
        discipline: 'Matemática',
        shift: 'Manhã' as Shift,
        classGroup: '9º Ano B',
        room: 'Sala 15'
    },
    {
        id: 3,
        day: 'Terça' as DayOfWeek,
        timeSlot: '07:00',
        discipline: 'Física',
        shift: 'Manhã' as Shift,
        classGroup: '3º Ano EM',
        room: 'Lab. Ciências'
    },
    {
        id: 4,
        day: 'Quarta' as DayOfWeek,
        timeSlot: '13:00',
        discipline: 'Matemática',
        shift: 'Tarde' as Shift,
        classGroup: '7º Ano C',
        room: 'Sala 10'
    },
    {
        id: 5,
        day: 'Quinta' as DayOfWeek,
        timeSlot: '09:00',
        discipline: 'Cálculo',
        shift: 'Manhã' as Shift,
        classGroup: '3º Ano EM',
        room: 'Sala 18'
    },
    {
        id: 6,
        day: 'Sexta' as DayOfWeek,
        timeSlot: '07:00',
        discipline: 'Física',
        shift: 'Manhã' as Shift,
        classGroup: '2º Ano EM',
        room: 'Lab. Ciências'
    }
];

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ shift, readOnly = false, onAddLesson }) => {
    const { state: { lessons } } = useLessons();
    const { state: { shiftSettings } } = useSchedule();

    // Usando os dados mockados temporariamente - remova depois que a API estiver funcionando
    const displayedLessons = process.env.NODE_ENV === 'development' ? mockLessons : lessons;
    
    const periods = shiftSettings[shift]?.periods || [];
    const days: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    if (periods.length === 0) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                backgroundColor: '#fff3cd',
                borderRadius: '4px',
                margin: '20px 0'
            }}>
                Nenhum horário definido para este turno.
            </div>
        );
    }

    const handleCellClick = (day: DayOfWeek, time: string) => {
        if (!readOnly && onAddLesson) {
            onAddLesson(day, time);
        }
    };

    return (
        <Grid>
            <HeaderCell>Horário</HeaderCell>
            {days.map(day => (
                <HeaderCell key={day}>{day.substring(0, 3)}</HeaderCell>
            ))}

            {periods.map(period => (
                <React.Fragment key={period.id || period.startTime}>
                    <TimeCell isBreak={period.isBreak}>
                        {period.startTime} - {period.endTime}
                        {period.isBreak && <div style={{ fontSize: '0.8em' }}>Intervalo</div>}
                    </TimeCell>
                    
                    {days.map(day => {
                        const lesson = displayedLessons.find(l => 
                            l.day === day && 
                            l.timeSlot === period.startTime && 
                            l.shift === shift
                        );
                        
                        return (
                            <Cell 
                                key={`${day}-${period.startTime}`}
                                onClick={() => handleCellClick(day, period.startTime)}
                                hasLesson={!!lesson}
                            >
                                {lesson ? (
                                    <div className="lesson-content">
                                        <strong>{lesson.discipline}</strong>
                                        <span>Turma: {lesson.classGroup}</span>
                                        <span>Sala: {lesson.room}</span>
                                    </div>
                                ) : (
                                    !readOnly && <span className="add-lesson">+</span>
                                )}
                            </Cell>
                        );
                    })}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default ScheduleGrid;