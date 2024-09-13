
import type { FormValues } from "./userForm";
import { ColumnDef } from "@tanstack/react-table"

export const columns : ColumnDef<FormValues>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        cell: ({row}) => {
            return new Date(row.getValue('dateOfBirth')).toLocaleDateString();
        },
    },
    {
        accessorKey: 'gender',
        header: 'Gender',
    },
    {
        accessorKey: 'emailMarketing',
        header: 'Is Email Marketing',
    },
    {
        accessorKey: 'country',
        header: 'Country',
    },
]