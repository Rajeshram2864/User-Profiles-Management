import { useState, useEffect } from "react";
import { Eye, Trash2, Plus } from "lucide-react";
import { supabase } from "../lib/supabase";
import AddUserModal from "./AddUserModal";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  onViewUser: (userId: string) => void;
}

export default function UserList({ onViewUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Users</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add user
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 w-12 text-left text-sm font-medium text-gray-600">
                  Sr.No
                </th>
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-600">
                  User name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-2 py-4 w-12 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onViewUser(user.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}
