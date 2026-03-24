export const formatCurrency = (cents: number) => {
    const value = cents / 100;
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
};
