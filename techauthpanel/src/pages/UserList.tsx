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
            // The API returns { success: true, data: [...] }
            setUsers(response.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (isActive: boolean) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            {isActive ? 'Active' : 'Deactivated'}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-white">System Users</h2>
                    <p className="text-slate-400">Manage and monitor all users registered in the system.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <UserPlus className="w-5 h-5" />
                    Add New User
                </button>
            </div>

            <div className="glass rounded-2xl overflow-hidden border-white/5 bg-white/[0.02]">
                {/* Table Filters/Actions */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search user by name or email..."
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            <ArrowUpDown className="w-4 h-4" />
                            Sort
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="text-slate-500 text-sm font-medium">Fetching users from database...</p>
                        </div>
                    ) : error ? (
                        <div className="p-10 text-center">
                            <p className="text-red-400">{error}</p>
                            <button
                                onClick={fetchUsers}
                                className="mt-4 text-primary text-sm font-semibold underline underline-offset-4"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User Profile</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Join Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.length > 0 ? users.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/[0.01] group transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                                    {u.firstName?.[0] || u.email[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-white">{u.firstName} {u.lastName}</span>
                                                    <span className="text-xs text-slate-500">{u.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {u.role === 'ADMIN' ? (
                                                    <Shield className="w-4 h-4 text-primary" />
                                                ) : null}
                                                <span className="text-sm text-slate-300 font-medium">{u.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(u.isActive)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-500">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button title="Edit" className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                                <button title="View Profile" className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                                            No users found in the system.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination placeholder */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing <span className="text-white font-medium">{users.length}</span> of <span className="text-white font-medium">{users.length}</span> results</p>
                    <div className="flex items-center gap-2">
                        <button disabled className="px-3 py-1.5 rounded-lg border border-white/5 text-slate-600 cursor-not-allowed">Previous</button>
                        <button disabled className="px-3 py-1.5 rounded-lg border border-white/5 text-slate-600 cursor-not-allowed">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
