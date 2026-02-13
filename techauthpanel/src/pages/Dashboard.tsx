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
        <div className="app-container">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <Shield size={24} color="white" />
                    </div>
                    <span className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>TechAuth</span>
                </div>

                <nav className="nav-links">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                                {isActive && <div className="link-dot"></div>}
                            </Link>
                        );
                    })}
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="btn-icon lg-hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{ display: window.innerWidth < 1024 ? 'block' : 'none' }}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="header-search">
                            <Search className="search-icon" size={18} />
                            <input type="text" placeholder="Search resources, users..." />
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="btn-icon" style={{ position: 'relative' }}>
                            <Bell size={20} />
                            <div style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#ef4444',
                                borderRadius: '50%',
                                border: '2px solid #0c0c0e'
                            }}></div>
                        </button>

                        <div className="user-profile">
                            <div style={{ textAlign: 'right', display: window.innerWidth > 640 ? 'block' : 'none' }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user?.firstName || 'Admin'} {user?.lastName || 'User'}</p>
                                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{user?.role || 'Administrator'}</p>
                            </div>
                            <div className="user-avatar">
                                <div className="avatar-inner">
                                    {(user?.firstName?.[0] || 'A')}{(user?.lastName?.[0] || 'U')}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="page-container">
                    <Routes>
                        <Route path="/users" element={<UserList />} />
                        <Route path="/" element={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="title-group">
                                    <h2>Dashboard Overview</h2>
                                    <p>Total metrics and quick actions for your system.</p>
                                </div>

                                <div className="stats-grid">
                                    {[
                                        { label: 'Total Users', value: '1,284', trend: '+12%', color: '#34d399' },
                                        { label: 'Active Sessions', value: '432', trend: '+5%', color: '#60a5fa' },
                                        { label: 'System Health', value: '99.9%', trend: 'Stable', color: '#818cf8' },
                                        { label: 'Pending Invitations', value: '18', trend: '-2%', color: '#fbbf24' },
                                    ].map((stat, i) => (
                                        <div key={i} className="data-card stat-card">
                                            <p className="stat-label">{stat.label}</p>
                                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                                                <span className="stat-value">{stat.value}</span>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '99px', backgroundColor: 'rgba(255,255,255,0.05)', color: stat.color }}>{stat.trend}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="data-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(99,102,241,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                        <LayoutDashboard size={32} color="#6366f1" opacity={0.5} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Welcome to your Control Center</h3>
                                    <p style={{ color: '#94a3b8', maxWidth: '400px' }}>Navigate through the sidebar to manage users, invite new administrators, or adjust system configuration.</p>
                                    <Link to="/dashboard/users" className="btn-primary" style={{ marginTop: '1.5rem' }}>View Users List</Link>
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
