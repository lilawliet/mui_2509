// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import type { ITaskTableFilters, ITaskTableFilterValue } from '../../types/task';


// ----------------------------------------------------------------------

type Props = {
  filters: ITaskTableFilters;
  onFilters: (name: string, value: ITaskTableFilterValue) => void;
  onSort: (name: string) => void;
  onAddTask?: () => void;
  onDeleteTask?: () => void;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export default function TaskTableToolbar({ filters, onAddTask, onDeleteTask ,onFilters, onSort, orderBy, order}: Props) {

  const popover = usePopover();
  const confirmPopover = usePopover();
  const sortPopover = usePopover();

  // 检查当前状态是否被选中
  const isStatusSelected = (status: string) => {
    if (status === 'all') {
      return !filters.status || filters.status === 'all';
    }
    return filters.status === status;
  };

  // 检查当前排序是否被选中
  const isSortSelected = (sortField: string) => {
    return orderBy === sortField && orderBy !== '';
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
 
       
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>

          {/* New Task */}
          <Button
            variant="contained"
            startIcon={<Iconify icon="material-symbols-light:add" />}
            onClick={onAddTask}
          >
            New Task
          </Button>

          {/* Filter */}
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="mage:filter" />
          </IconButton>

          {/* Sorter */}
          <IconButton onClick={sortPopover.onOpen}>
            <Iconify icon="mi:sort" />
          </IconButton>

          {/* Delete */}
          <IconButton onClick={confirmPopover.onOpen}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ color: 'error.main' }} />
          </IconButton>


        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-center"
        sx={{ width: 160 }}
      >
        <MenuItem
          selected={isStatusSelected('active')}
          onClick={() => {
            onFilters('status', 'active');
            popover.onClose();
          }}
        >
          <ListItemText primary="Processing" />
          <ListItemIcon>
            {isStatusSelected('active') && (
              <Iconify icon="eva:checkmark-fill" width={20} height={20} />
            )}
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          selected={isStatusSelected('completed')}
          onClick={() => {
            onFilters('status', 'completed');
            popover.onClose();
          }}
        >
          <ListItemText primary="Completed" />
          <ListItemIcon>
            {isStatusSelected('completed') && (
              <Iconify icon="eva:checkmark-fill" width={20} height={20} />
            )}
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          selected={isStatusSelected('all')}
          onClick={() => {
            onFilters('status', 'all');
            popover.onClose();
          }}
        >
          <ListItemText primary="All" />
          <ListItemIcon>
            {isStatusSelected('all') && (
              <Iconify icon="eva:checkmark-fill" width={20} height={20} />
            )}
          </ListItemIcon>
        </MenuItem>
      </CustomPopover>

      <CustomPopover
        open={sortPopover.open}
        onClose={sortPopover.onClose}
        arrow="top-center"
        sx={{ width: 160 }}
      >
        <MenuItem
          selected={isSortSelected('due')}
          onClick={() => {
            onSort('due');
            sortPopover.onClose();
          }}
        >
          <ListItemText primary="Due Date" />
          <ListItemIcon>
            {isSortSelected('due') && (
              order === 'asc' ? (
                <Iconify icon="eva:arrow-upward-fill" width={20} height={20} />
              ) : (
                <Iconify icon="eva:arrow-downward-fill" width={20} height={20} />
              )
            )}
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          selected={isSortSelected('created')}
          onClick={() => {
            onSort('created');
            sortPopover.onClose();
          }}
        >
          <ListItemText primary="Created At" />
          <ListItemIcon>
            {isSortSelected('created') && (
              order === 'asc' ? (
                <Iconify icon="eva:arrow-upward-fill" width={20} height={20} />
              ) : (
                <Iconify icon="eva:arrow-downward-fill" width={20} height={20} />
              )
            )}
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          selected={isSortSelected('id')}
          onClick={() => {
            onSort('id');
            sortPopover.onClose();
          }}
        >
          <ListItemText primary="Task ID" />
          <ListItemIcon>
            {isSortSelected('id') && (
              order === 'asc' ? (
                <Iconify icon="eva:arrow-upward-fill" width={20} height={20} />
              ) : (
                <Iconify icon="eva:arrow-downward-fill" width={20} height={20} />
              )
            )}
          </ListItemIcon>
        </MenuItem>
      </CustomPopover>

      {/* Delete Confirmation Popover */}
      <CustomPopover
        open={confirmPopover.open}
        onClose={confirmPopover.onClose}
        arrow="top-center"
        sx={{ width: 200 }}
      >
        <Stack spacing={1} sx={{ p: 1 }}>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            确认删除
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            确定要删除所有任务吗？
          </Typography>
          <Divider />
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={confirmPopover.onClose}
              fullWidth
            >
              取消
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                onDeleteTask?.();
                confirmPopover.onClose();
              }}
              fullWidth
            >
              删除
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}
