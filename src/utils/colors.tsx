export const getStatusColor = (status: string) => {
    switch (status) {
        case "completed": return "text-green-500";
        case "pending": return "text-yellow-500";
        case "failed": return "text-red-500";
        default: return "text-muted-foreground";
    }
};