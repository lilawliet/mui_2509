import { useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import _ from 'lodash';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { IDeviceTableFilters, IDeviceTableFilterValue } from '../../types/device';


// ----------------------------------------------------------------------

type Props = {
  filters: IDeviceTableFilters;
  onFilters: (name: string, value: IDeviceTableFilterValue) => void;
};

export default function DeviceTableToolbar({ filters, onFilters }: Props) {

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
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{'Sites'}</InputLabel>
          <Select
            value={filters.site}
            onChange={handleFilterSite}
            input={<OutlinedInput label={'Sites'} />}
          >
            {/* {sites.map((option) => (
              <MenuItem key={option.site_id} value={option.site_id}>
                {option.name_en}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
        {/* <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{t('Sites')}</InputLabel>

          <Select
            multiple
            value={filters.sites}
            onChange={handleFilterSites}
            input={<OutlinedInput label={t('Sites')} />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {sites.map((option) => (
              <MenuItem key={option.site_id} value={option.site_id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.sites.includes(option.site_id)}
                />
                {option.name_en}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{t('Areas')}</InputLabel>

          <Select
            multiple
            value={filters.areas}
            onChange={handleFilterAreas}
            input={<OutlinedInput label={t('Areas')} />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            sx={{ textTransform: 'capitalize' }}
          >
            {areas.map((option) => (
              <MenuItem key={option.site_area_id} value={option.site_area_id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.areas.includes(option.site_area_id)}
                />
                {option.area_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{t('Zones')}</InputLabel>

          <Select
            multiple
            value={filters.zones}
            onChange={handleFilterZones}
            input={<OutlinedInput label={t('Zones')} />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            sx={{ textTransform: 'capitalize' }}
          >
            {zones.map((option) => (
              <MenuItem key={option.zone_id} value={option.zone_id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.zones.includes(option.zone_id)}
                />
                {option.name_en}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder={'Search...'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
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
