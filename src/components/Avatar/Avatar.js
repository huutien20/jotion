function Avatar({ src, alt, size = 'md' }) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-7 h-7',
        lg: 'w-9 h-9',
    };

    return (
        <div className={`flex items-center justify-center rounded-full shrink-0 ${sizeClasses[size]}`}>
            <img src={src} alt={alt} className="object-contain w-full h-full rounded-full" />
        </div>
    );
}

export default Avatar;
