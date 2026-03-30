import RequireAuth from '@/requireAuth'

const LinkLayout = ({ children }) => {

    return (
        <RequireAuth>
            {children}
        </RequireAuth>
    )
}

export default LinkLayout