import { SeatType } from "./types/Team";

export const getSeatPosition = (seatId: string, seats: SeatType[]) => {
  const seat = seats.find(s => s.id === seatId);
  return seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : '';
};