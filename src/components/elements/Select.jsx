import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";

export function SelectComponent({ options, placeholder, handleChange, id }) {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-64" id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
              className="hover:bg-gray-100"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
};
