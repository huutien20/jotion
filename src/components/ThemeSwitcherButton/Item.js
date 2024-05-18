function Item({ label, icon: Icon, onClick: handleClick }) {
    return (
        <li
            className="p-1 flex items-center gap-x-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md"
            onClick={() => handleClick(label)}
        >
            <Icon size={18} />
            <p>{label}</p>
        </li>
    );
}

export default Item;
