import TourCard from "@/entities/tour/ui/TourCard/TourCard";
import TourUpdateForm from "@/entities/tour/ui/TourUpdateForm/TourUpdateForm";
import { JSX } from "react";

export default function OneTourPage(): JSX.Element {
  return (
    <>
    <TourUpdateForm />
    <TourCard />
    </>
  )
}