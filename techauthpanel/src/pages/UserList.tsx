import { useState, useEffect } from 'react';
import {
    Search,
    MoreVertical,
    UserPlus,
    Filter,
    ArrowUpDown,
    ExternalLink,
    Shield,
    Loader2
} from 'lucide-react';
import api from '../services/api';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/users');
            setUsers(response.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (isActive: boolean) => (
        <div className={`badge ${isActive ? 'badge-success' : 'badge-error'}`}>
            <div className="badge-dot" style={{ backgroundColor: isActive ? '#10b981' : '#ef4444' }}></div>
            {isActive ? 'Active' : 'Deactivated'}
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="page-header">
                <div className="title-group">
                    <h2>System Users</h2>
                    <p>Manage and monitor all users registered in the system.</p>
                </div>
                <button className="btn-primary">
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            <div className="data-card">
                {/* Table Filters */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="header-search">
                        <Search className="search-icon" size={16} />
                        <input type="text" placeholder="Search user by name or email..." />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn-icon">
                            <Filter size={16} />
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>Filter</span>
                        </button>
                        <button className="btn-icon">
                            <ArrowUpDown size={16} />
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>Sort</span>
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <Loader2 className="animate-spin" size={40} color="#6366f1" />
                            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Fetching users from database...</p>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <p style={{ color: '#ef4444' }}>{error}</p>
                            <button onClick={fetchUsers} style={{ background: 'none', border: 'none', color: '#6366f1', textDecoration: 'underline', marginTop: '1rem', cursor: 'pointer' }}>Try Again</button>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>User Profile</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Join Date</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem', color: '#94a3b8' }}>
                                                    {u.firstName?.[0] || u.email[0].toUpperCase()}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: '600' }}>{u.firstName} {u.lastName}</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                {u.role === 'ADMIN' && <Shield size={14} color="#6366f1" />}
                                                <span style={{ fontWeight: '500' }}>{u.role}</span>
                                            </div>
                                        </td>
                                        <td>{getStatusBadge(u.isActive)}</td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{new Date(u.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button className="btn-icon"><MoreVertical size={14} /></button>
                                                <button className="btn-icon"><ExternalLink size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>No users found in the system.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Showing <b>{users.length}</b> users</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-icon" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Prev</button>
                        <button className="btn-icon" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
