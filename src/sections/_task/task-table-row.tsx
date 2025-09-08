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
import type { ILineItem } from 'src/types/line';

// ----------------------------------------------------------------------

type Props = {
  row: ITaskItem;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onSelectLine?: (selected: string[]) => void;
  onDeleteRow: VoidFunction;
  onImportKey: VoidFunction;
  onRetrieveKey: VoidFunction;
};

export default function TaskTableRow({
  row,
  selected,
  onSelectRow,
  onSelectLine,
  onDeleteRow,
  onEditRow,
  onImportKey,
  onRetrieveKey,
}: Props) {
  const {
    sensor_id, // sensor id
    site_id, // site id
    name, // task name
    mac_address, // mac_address address
    ip_address, // ip address
    port, // port
    floor_id, // floor id
    area_id, // area id
    zone_id, // zone id
    multiplier, // multiplier
    description, // description
    sensor_type_id, // sensor type
    discriminator, // activation status
    public_ip_address, // public ip address
    additional_info, // additional info
    reading_interval, // time interval
    // lines, // lines
  } = row;



  const confirm = useBoolean();

  const popover = usePopover();

  const collapse = useBoolean();

  const Initialized = useBoolean(false);

  const [lines, setLines] = useState<ILineItem[]>([]);

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

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText primary={site_id} />
        </TableCell>
        <TableCell>
          <ListItemText primary={name} />
        </TableCell>
        <TableCell>
          <ListItemText primary={mac_address} />
        </TableCell>
        <TableCell>
          <ListItemText primary={ip_address} />
        </TableCell>
        <TableCell>
          <ListItemText primary={port} />
        </TableCell>
        <TableCell>
          <ListItemText primary={floor_id} />
        </TableCell>
        <TableCell>
          <ListItemText primary={area_id} />
        </TableCell>
        <TableCell>
          <ListItemText primary={zone_id} />
        </TableCell>
        <TableCell>
          <ListItemText primary={Number(multiplier).toFixed(1)} />
        </TableCell>
        <TableCell>
          <ListItemText primary={description} />
        </TableCell>
        <TableCell>
          <ListItemText primary={sensor_type_id} />
        </TableCell>
        <TableCell>
          <ListItemText primary={discriminator} />
        </TableCell>
        <TableCell>
          <ListItemText primary={public_ip_address} />
        </TableCell>
        <TableCell>
          <ListItemText primary={additional_info} />
        </TableCell>
        <TableCell>
          <ListItemText primary={reading_interval} />
        </TableCell>
        <TableCell>
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapseToggle}
            sx={{
              ...(collapse.value && {
                bgcolor: 'action.hover',
              }),
            }}
          >
            <Iconify icon="eva:arrow-ios-downward-fill" />
          </IconButton>
          {/* <ListItemText */}
          {/*  primary={format(new Date(createdAt), 'dd MMM yyyy')} */}
          {/*  secondary={format(new Date(createdAt), 'p')} */}
          {/*  primaryTypographyProps={{ typography: 'body2', noWrap: true }} */}
          {/*  secondaryTypographyProps={{ */}
          {/*    mt: 0.5, */}
          {/*    component: 'span', */}
          {/*    typography: 'caption', */}
          {/*  }} */}
          {/* /> */}
        </TableCell>
        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

 

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
        <MenuItem
          onClick={() => {
            onImportKey();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {'Import Sensor License Key'}
        </MenuItem>
      </CustomPopover>

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('Delete')}
        content={t('Are you sure want to delete?')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('Delete')}
          </Button>
        }
      /> */}
    </>
  );
}
