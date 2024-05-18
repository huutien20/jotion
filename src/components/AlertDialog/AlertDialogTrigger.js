function AlertDialogTrigger({ className, children, onClick: handleClick }) {
    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );
}

export default AlertDialogTrigger;
