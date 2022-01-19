const Button = ({ text }) => {
    return (
      <button
        onClick={event => event.target.innerText = 'You clicked me!'}
      >
        {text}
      </button>
    )
  }
  
  export default Button