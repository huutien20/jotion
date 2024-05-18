function DropdownMenuItem({ children, className, onClick: handleClick }) {
    return (
        <div onClick={handleClick} className={`cursor-pointer hover:bg-primary/5 rounded-md ${className}`}>
            {children}
        </div>
    );
}

export default DropdownMenuItem;
