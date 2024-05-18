function PopoverTrigger({ children, className, onClick: handleClick }) {
    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );
}

export default PopoverTrigger;
