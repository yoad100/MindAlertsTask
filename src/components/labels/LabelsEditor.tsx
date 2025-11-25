import { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { LabelChips } from './LabelChips';

interface LabelsEditorProps {
  labels: string[];
  onChange: (labels: string[]) => void;
}

export function LabelsEditor({ labels, onChange }: LabelsEditorProps) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed || labels.includes(trimmed)) return;
    onChange([...labels, trimmed]);
    setValue('');
  };

  const handleRemove = (label: string) => {
    onChange(labels.filter((l) => l !== label));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add label and press Enter"
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleAdd}
          disabled={!value.trim()}
        >
          Add
        </Button>
      </Stack>
      <LabelChips labels={labels} onRemove={handleRemove} />
    </Box>
  );
}
