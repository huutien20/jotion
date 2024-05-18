function Logo() {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <img src="/logo.svg" alt="Logo" width={40} height={40} className="dark:hidden" />
            <img src="/logo-dark.svg" alt="Logo" width={40} height={40} className="hidden dark:block" />
            <p className="font-bold">Jotion</p>
        </div>
    );
}

export default Logo;
