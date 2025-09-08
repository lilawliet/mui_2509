// @mui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {  useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
// components
// import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
// types
import type { ITaskItem } from 'src/types/task';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

type Props = {
  row: ITaskItem;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onSelectLine?: (selected: string[]) => void;
  onImportKey: VoidFunction;
  onRetrieveKey: VoidFunction;
};

export default function TaskTableRow({
  row,
  selected,
  onSelectRow,
  onSelectLine,
  onEditRow,
  onImportKey,
  onRetrieveKey,
}: Props) {



  const confirm = useBoolean();

  const popover = usePopover();

  const collapse = useBoolean();

  const Initialized = useBoolean(false);

  const collapseToggle = () => {
    if (!Initialized.value) {
      // get lines by task id
      // getTaskLine({
      //   sensor_id,
      //   site_id,
      // })
      //   .then((res) => {
      //     collapse.onToggle();
      //     setLines(res.data as unknown as ILineItem[]);

      //     // setLines(res);
      //     // Initialized.onTrue();
      //   })
      //   .catch((err) => {
      //     console.log('err', err);
      //     setLines([]);
      //   });
    } else {
      collapse.onToggle();
    }
  };


  return (
    <>
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
{/* 
 

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {'Edit'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {'Delete'}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onRetrieveKey();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {'Retrieve Sensor License Key'}
        </MenuItem>
      </CustomPopover> */}

    </>
  );
}
