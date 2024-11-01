import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const AnnivPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let anniv = JSON.stringify(localStorage.getItem('anniv'));
        if (anniv != 'true') {
            navigate('/wait')
        }
    }, [])

    return (
        <div>AnnivPage</div>
    )
}

export default AnnivPage