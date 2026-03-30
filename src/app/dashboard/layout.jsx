import RequireAuth from '@/requireAuth'
import React from 'react'

const DashboardLayout = ({ children }) => {

    return (
        <RequireAuth>
            {children}
        </RequireAuth>
    )
}

export default DashboardLayout