export const Logo = () => {
    return (
        <>
            <img src="/images/logo-dark.svg" suppressHydrationWarning alt="Logo" className="h-7 dark:hidden" />
            <img src="/images/logo-light.svg" alt="Logo" suppressHydrationWarning className="hidden h-7 dark:inline" />
        </>
    );
};
