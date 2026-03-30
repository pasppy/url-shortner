
const DisplayError = ({ message }) => {
    if (!message) return null
    return (
        <span className='text-red-400 text-sm'>*{message}</span>
    )
}
export default DisplayError