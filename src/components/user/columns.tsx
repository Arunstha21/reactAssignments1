import { Edit, Trash } from "lucide-react";
import type { FormValues } from "./userForm";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

// Define a type for the actions props
type ActionsProps = {
  onEdit: (data: FormValues & {id: string}) => void;
  onDelete: (id: string) => void;
}

export const columns = ({ onEdit, onDelete }: ActionsProps): ColumnDef<FormValues & {id: string}>[] => [
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
    cell: ({ row }) => row.getValue('emailMarketing') ? 'Yes' : 'No',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    id: 'id',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onDelete(row.original.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  }
]