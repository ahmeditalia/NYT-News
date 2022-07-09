import { ReactNode, useEffect, useState } from "react"
import { Navigate, Outlet, RouteProps } from "react-router-dom"

type RoutesGuardProps = {
    guard: boolean,
    alt: string
}

export const RoutesGuard = ({ guard , alt }: RoutesGuardProps)=>{

    return (
        guard ? <Outlet/> : <Navigate to={alt}/>
    )
}