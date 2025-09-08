// @mui
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// types
import type { ITaskItem } from 'src/types/task';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

type Props = {
  row: ITaskItem;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function TaskTableRow({
  row,
  selected,
  onSelectRow,
}: Props) {


  return (
    
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
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
          <ListItemText primary={row.due ? dayjs(row.due).format('YYYY-MM-DD hh:mm') : ''} />
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
