import { JSX } from "react";
import TourList from "@/widgets/TourList/TourList";
import TourForm from "@/widgets/TourForm/TourForm";

export default function TourPage(): JSX.Element {
  return (
    <div>
      <TourForm />
      <TourList isProfile={false}/>
    </div>
  )
}