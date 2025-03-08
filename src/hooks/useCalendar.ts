import { useState } from "react";
import { Event } from '../utils/types'

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>("todos");
    const [eventos, setEventos] = useState<Event[]>([
        {
            id: 1,
            title: "Prova Bimestral",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
            type: "assessment",
            description: "Avaliação de conteúdos do bimestre"
        },
        {
            id: 2,
            title: "Entrega de Trabalho",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
            type: "activity",
            description: "Entrega do trabalho em grupo sobre o tema estudado"
        },
        {
            id: 3,
            title: "Feira de Ciências",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
            type: "event",
            description: "Apresentação dos projetos na feira de ciências"
        }
    ]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const filteredEventos = activeTab === "todos"
        ? eventos
        : eventos.filter(evento => evento.type === activeTab);

    return {
        currentDate,
        activeTab,
        eventos,
        handlePrevMonth,
        handleNextMonth,
        handleTabChange,
        getDaysInMonth,
        getFirstDayOfMonth,
        filteredEventos
    };
};
