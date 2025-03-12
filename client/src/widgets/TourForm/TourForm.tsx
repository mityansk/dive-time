import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks"
import { useNavigate } from "react-router"

export default function TaskForm() {
  const INITIAL_INPUTS_DATA = {
		location_name: '',
		description: '',
    data: '',
	}
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state)

  return (
    <></>
  )
}