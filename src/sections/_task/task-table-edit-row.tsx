import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

// ----------------------------------------------------------------------

type Props = {
  onEnter:(title: string) => void;
};

export type TaskTableEditRowRef = {
  focus: () => void;
};

const TaskTableEditRow = forwardRef<TaskTableEditRowRef, Props>(({
  onEnter,
}, ref) => {

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue.trim()) {
        onEnter(inputValue.trim());
        setInputValue(''); // 清空输入框
      }
    }
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  return (
    
      <TableRow  >
        <TableCell padding="checkbox">
        </TableCell>

        <TableCell>
          <TextField
            inputRef={inputRef}
            label="New Task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Press Enter to create task"
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>
        </TableCell>
        <TableCell>
        </TableCell>
        <TableCell align="right">
        </TableCell>
      </TableRow>

  
  );
});

export default TaskTableEditRow;
