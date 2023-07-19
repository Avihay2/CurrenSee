import "../styles/Option.css"

const Option = ({ icon, description, onClick }) => {
    return (
        <div className='option-container' onClick={onClick}>
            {icon}
            <span className="option-description">{description}</span> <br />
        </div>
    );
};

export default Option;