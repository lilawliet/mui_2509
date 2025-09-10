// @mui
import Radio from '@mui/material/Radio';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// icons
import Iconify from 'src/components/iconify';
// types
import type { ITaskItem } from 'src/types/task';
import dayjs from 'dayjs';
// hooks
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  row: ITaskItem;
  selected: boolean;
  onSelectRow: VoidFunction;
  onUpdateDue: (id: string, due: Date) => void;
};

export default function TaskTableRow({
  row,
  selected,
  onSelectRow,
  onUpdateDue,
}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      onUpdateDue(row.id, newDate.toDate());
    }
    setShowDatePicker(false);
  };

  // 检查任务是否过期且未完成
  const isOverdueAndNotDone = row.due && !row.done && dayjs().isAfter(dayjs(row.due));

  return (
    
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Radio
            checked={selected}
            onClick={() => {
              onSelectRow();
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText primary={row.title} />
        </TableCell>
        <TableCell>
          {row.due ? (
            <ListItemText 
              primary={dayjs(row.due).format('YYYY-MM-DD hh:mm')} 
              sx={{
                color: isOverdueAndNotDone ? 'error.main' : 'inherit'
              }}
            />
          ) : (
              !showDatePicker ? (
                <IconButton
                  onClick={() => setShowDatePicker(true)}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <Iconify icon="eva:calendar-outline" />
                </IconButton>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={null}
                    onChange={handleDateChange}
                    onClose={() => setShowDatePicker(false)}
                    slotProps={{
                      textField: {
                        size: 'small',
                        variant: 'outlined',
                        placeholder: '选择日期时间',
                      },
                    }}
                    open={showDatePicker}
                  />
                </LocalizationProvider>
              )
          )}
        </TableCell>
        <TableCell>
          <ListItemText primary={dayjs(row.created).format('YYYY/MM/DD hh:mm')} />
        </TableCell>
        <TableCell align="right">
          <ListItemText primary={row.id} />
        </TableCell>
      </TableRow>

  
  );
}
