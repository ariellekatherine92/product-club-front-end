import { Link } from 'react-router-dom'

const ButtonMailto = ({ mailto, label }) => {
  return (
    
      <Link to='#' onClick={(e) => {
        window.location = mailto;
        e.preventDefault(); 
      }}>
        <button>Email</button>
      </Link>
      
  )
}

export default ButtonMailto;