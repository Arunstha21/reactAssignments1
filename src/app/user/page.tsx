'use client';

import { useState, useEffect } from 'react';
import { DataTable } from "@/components/user/data-table";
import UserForm from "@/components/user/userForm";
import { columns } from "@/components/user/columns";
import { deleteUser, getUsers } from "@/services/users";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FormValues } from "@/components/user/userForm";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<FormValues & {id: string} | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setIsLoading(true);
    getUsers()
      .then((fetchedData) => setData(fetchedData))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }

  const handleEdit = (data: FormValues & {id: string}) => {
    setEditData(data);
    setIsEdit(true);
    setIsFormOpen(true);
  };
  

  const handleDelete = (id: string) => {
    deleteUser(id)
      .then(() => fetchUsers())
      .catch((err) => setError(err.message));
  };

  const tableColumns = columns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      
      {isFormOpen && (
        <div className="mb-6">
          <UserForm 
            onUserAdded={() => {
              fetchUsers();
              setIsFormOpen(false);
            }}
            isFormOpen={isFormOpen}
            onCancel={() => {
                setIsFormOpen(false)
                setEditData(null)
            }}
            isEdit={isEdit}
            editData={editData || undefined}
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <DataTable columns={tableColumns} data={data} />
      )}
    </div>
  );
}