import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";

type props = {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
    defaultValue: string;
}

export default function SelectCategory({category, setCategory, defaultValue}: props) {
    return (
        <Select onValueChange={(value) => setCategory(value)} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder={category} />
        </SelectTrigger>
        <SelectContent>
          {defaultValue === "all" ? <SelectItem value="all">All</SelectItem> : null}
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="home">Home</SelectItem>
        </SelectContent>
      </Select>
    )
}