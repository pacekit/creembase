const DashboardPage = async () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-16 font-medium">
                        Stat #1
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-16 font-medium">
                        Stat #2
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-16 font-medium">
                        Stat #3
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-16 font-medium">
                        Stat #4
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-48 font-medium lg:col-span-3">
                        Main Chart
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-48 font-medium lg:col-span-2">
                        Analytics
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-32 font-medium">
                        Table
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-32 font-medium">
                        Sub Chart
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center rounded-md border py-32 font-medium">
                        Quick Actions
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
