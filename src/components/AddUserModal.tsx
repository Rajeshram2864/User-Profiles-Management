import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AddUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddUserModal({ onClose, onSuccess }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('users')
        .insert([formData]);

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white w-1/2 h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-7 border-b border-gray-200">
          <h2 className="text-lg font-medium">Add User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 flex flex-col">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Name of the user
            </label>
            <input
              type="text"
              placeholder="Type here"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Type here"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Contact
              </label>
              <div className="flex gap-2">
               
                <input
                  type="text"
                  placeholder="Type here"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
       
            <div className=" border-t border-gray-300 flex justify-end mt-[425px] gap-5 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#F0EBFF] text-purple-600 hover:bg-purple-60 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#6834FF] text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
