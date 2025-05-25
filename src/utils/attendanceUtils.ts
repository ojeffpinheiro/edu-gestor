export const getStudentAttendance = (id?: number): number => {
    if (!id) return 0;
    return Math.floor(Math.random() * 100);
};

export const getAttendanceColor = (attendance: number): string => {
    if (attendance >= 90) return '#4CAF50';
    if (attendance >= 75) return '#FFC107';
    return '#F44336';
};