import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';

import { useDebounce } from '../../../shared/hooks';
import { CitiesService } from '../../../shared/services/api/cities/CitiesService';

type TCityAutocompleteOption = {
  id: number;
  label: string;
}

interface ICityAutocompleteProps {
  isExternalLoading?: boolean;
}

export const CityAutocomplete = ({ isExternalLoading = false }: ICityAutocompleteProps) => {
  const { debounce } = useDebounce();
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');

  const [options, setOptions] = useState<TCityAutocompleteOption[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search, selectedId?.toString())
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error)
            return alert(result.message);

          setOptions(result.data.map(city => ({ id: city.id, label: city.name })));
        });
    });
  }, [search, selectedId]);

  const autocompleteSelectedOption = useMemo(() => {
    if (!selectedId)
      return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption)
      return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autocompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
      renderInput={(params) => (
        <TextField
          {...params}

          label='City'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};