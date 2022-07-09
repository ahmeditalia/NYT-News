import { Navigate, Outlet } from "react-router-dom"

type RoutesGuardProps = {
    guard: boolean,
    alt: string
}

export const RoutesGuard = ({ guard , alt }: RoutesGuardProps)=>{

    return (
        guard ? <Outlet/> : <Navigate to={alt}/>
    )
}