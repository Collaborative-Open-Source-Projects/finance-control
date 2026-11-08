import { LayoutDashboard, ArrowLeftRight, Wallet, Tags } from "lucide-react";

export const navigationItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Transactions",
        href: "/transactions",
        icon: ArrowLeftRight,
    },
    {
        name: "Accounts",
        href: "/accounts",
        icon: Wallet,
    },
    {
        name: "Categories",
        href: "/categories",
        icon: Tags,
    },
];