import { FunctionComponent, KeyboardEvent, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface SearchFormProps {
  onSearch: (value: string) => void;
  isLoading?: boolean;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (!value.trim()) {
      return alert('Please enter a value to search');
    }

    onSearch(value.toLowerCase());
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Search..."
        disabled={isLoading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded-none"
      />
      <Button
        onClick={handleSearch}
        label="Search"
        isDisabled={isLoading}
        isLoading={isLoading}
        className="rounded-none"
      />
    </div>
  );
};
