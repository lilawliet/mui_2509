import { useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import _ from 'lodash';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { ITaskTableFilters, ITaskTableFilterValue } from '../../types/task';
import { Button } from '@mui/material';


// ----------------------------------------------------------------------

type Props = {
  filters: ITaskTableFilters;
  onFilters: (name: string, value: ITaskTableFilterValue) => void;
};

export default function TaskTableToolbar({ filters, onFilters }: Props) {

  const popover = usePopover();



  // const _refreshAreas = useCallback(
  //   (site_ids?: string[]) =>
  //     _.debounce(() => {
  //       refreshAreas({ site_ids });
  //     }, 1000),
  //   [refreshAreas]
  // );

  // useEffect(() => {
  //   if (filters.sites.length > 0) refreshAreas({ site_ids: filters.sites });
  // }, [filters.sites, refreshAreas]);

  // const _refreshZones = useCallback(
  //   (site_area_ids?: string[]) =>
  //     _.debounce(() => {
  //       refreshZones({ site_area_ids });
  //     }, 1000),
  //   [refreshZones]
  // );

  // useEffect(() => {
  //   if (filters.areas.length > 0) refreshZones({ site_area_ids: filters.areas });
  // }, [filters.areas, refreshZones]);

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterSite = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('site', event.target.value);
    },
    [onFilters]
  );

  const handleFilterSites = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'sites',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterAreas = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'areas',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterZones = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'zones',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

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
            onClick={() => {
            }}
          >
            New Task
          </Button>

          {/* Filter */}
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="mage:filter" />
          </IconButton>

          {/* Sorter */}
          <IconButton onClick={() => {
       
          }}>
            <Iconify icon="mi:sort" />
          </IconButton>


        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
