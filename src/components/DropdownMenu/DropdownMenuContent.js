function DropdownMenuContent({ children, className }) {
    return (
        <div
            className={`mt-1 p-2 origin-top-right bg-background border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
        >
            {children}
        </div>
    );
}

export default DropdownMenuContent;
