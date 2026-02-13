import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Users,
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    Shield,
    Bell,
    Search
} from 'lucide-react';
import UserList from './UserList';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Users, label: 'Users', path: '/dashboard/users' },
        { icon: Shield, label: 'Roles & Permissions', path: '/dashboard/roles' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#0c0c0e] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0c0c0e] border-r border-white/5 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold gradient-text">TechAuth</span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5 transition-colors group-hover:text-red-400" />
                        <span className="font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0c0c0e]/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search resources, users..."
                                className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-white/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0c0c0e]"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-5 border-l border-white/5">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-white">{user?.firstName || 'Admin'} {user?.lastName || 'User'}</p>
                                <p className="text-xs text-slate-500">{user?.role || 'Administrator'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-400 p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center text-primary font-bold">
                                    {(user?.firstName?.[0] || 'A')}{(user?.lastName?.[0] || 'U')}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="p-8 overflow-y-auto">
                    <Routes>
                        <Route path="/users" element={<UserList />} />
                        <Route path="/" element={
                            <div className="space-y-6">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                                    <p className="text-slate-400">Total metrics and quick actions for your system.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Total Users', value: '1,284', trend: '+12%', color: 'text-emerald-400' },
                                        { label: 'Active Sessions', value: '432', trend: '+5%', color: 'text-blue-400' },
                                        { label: 'System Health', value: '99.9%', trend: 'Stable', color: 'text-indigo-400' },
                                        { label: 'Pending Invitations', value: '18', trend: '-2%', color: 'text-amber-400' },
                                    ].map((stat, i) => (
                                        <div key={i} className="glass p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-all group">
                                            <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                                            <div className="flex items-end justify-between">
                                                <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 ${stat.color}`}>
                                                    {stat.trend}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center min-h-[300px] text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                                        <LayoutDashboard className="w-8 h-8 text-primary opacity-50" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Welcome to your Control Center</h3>
                                    <p className="text-slate-400 max-w-md">Navigate through the sidebar to manage users, invite new administrators, or adjust system configuration.</p>
                                    <Link
                                        to="/dashboard/users"
                                        className="mt-6 inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl border border-white/10 transition-all"
                                    >
                                        View Users List
                                    </Link>
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
