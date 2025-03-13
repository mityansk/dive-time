import { JSX } from "react";
import TourList from "@/widgets/TourList/TourList";
import TaskForm from "@/widgets/TourForm/TourForm";

export default function TourPage(): JSX.Element {
  return (
    <div>
      <TourList />
      <TaskForm />
    </div>
  )
}