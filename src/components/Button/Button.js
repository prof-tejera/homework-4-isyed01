const Button = ({ value, label="", className="", type="button", onClick }) => {
    /** TODO: What happens when a user clicks a number, what do we want to pass to our parent? */
    return (
      <button value={value} className={className} onClick={onClick} type={type} >
        {label}
      </button>
    );
  };
  
  export default Button;
  