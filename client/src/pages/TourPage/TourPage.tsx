import { JSX } from "react";
import TourList from "@/widgets/TourList/TourList";

export default function TourPage(): JSX.Element {
  return (
    <div style={{ paddingTop: '80px' }}>
      <TourList isProfile={false} />
    </div>
  );
}