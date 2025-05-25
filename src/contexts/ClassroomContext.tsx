import { StudentFormData } from "../utils/types/BasicUser";
import { LayoutConfig, SeatType } from "../utils/types/Team";

interface ClassroomContextType {
  layout: LayoutConfig;
  savedLayouts: { name: string; layout: LayoutConfig }[];
  editLayoutMode: boolean;
  conferenceMode: boolean;
  verifyMode: boolean;
  swapMode: boolean;
  selectedStudent: StudentFormData | null;
  selectedSeat: SeatType | null;
  notification: { show: boolean; message: string; type: string };
}