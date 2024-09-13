'use client';

import { DataTable } from "@/components/user/data-table";
import UserForm from "../../components/user/userForm";
import { columns } from "@/components/user/columns";
import { getUsers } from "@/services/users";
import { useEffect, useState } from "react";


export default function UserPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getUsers()
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, []);

  return (
    <div className="m-10">
        <div className="flex item-center justify-between">
        <h1>User Page</h1>
        <UserForm />
        </div>
        <div className="mt-5 m-40">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={data} />
            )}
            {error && <div>Error: {error}</div>}
        </div>
    </div>
  );
}
