'use client';

import isEqual from 'lodash/isEqual';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { Box } from '@mui/material';

import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from 'src/components/table';
// types
import { IDeviceItem, IDeviceTableFilters, IDeviceTableFilterValue } from 'src/types/device';
//
// import { useLocales } from 'src/locales';
import DeviceTableRow from 'src/sections/_device/device-table-row';
import DeviceTableToolbar from 'src/sections/_device/device-table-toolbar';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

// const defaultFilters: IDeviceTableFilters = {
//   name: '',
//   site: '',
//   sort_floor_id: false,
//   sort_area_id: false,
//   sort_zone_id: false,
//   sort_ip_address: false,
// };

// ----------------------------------------------------------------------

const DeviceListView = forwardRef(
  (
    {
      operations = true,
      defaultFilters = {
        name: '',
        site: '',
        sort_floor_id: false,
        sort_area_id: false,
        sort_zone_id: false,
        sort_ip_address: false,
      },
      onSelected,
      onSelectLine,
    }: {
      operations?: boolean;
      defaultFilters?: IDeviceTableFilters;
      onSelected?: (rows: IDeviceItem[]) => void;
      onSelectLine?: (selected: string[]) => void;
    },
    ref
  ) => {
  

    const table = useTable();



    const [tableData, setTableData] = useState<IDeviceItem[]>([]);

    const [filters, setFilters] = useState(defaultFilters);

    // const { sites, areas, zones } = useLocationModuleLocal();

    // 通过 swr 方式缓存接口返回信息
    // const { devices, devicesLoading, devicesEmpty } = useGetDevices();
    // const { devices: datas, devicesLoading: loading, devicesEmpty: empty } = useGetDevices();

    const confirm = useBoolean();

    const quickEdit = useBoolean();
    const [editRow, setEditRow] = useState<IDeviceItem>();

    // 表头
    const TABLE_HEAD = [
      { id: 'title', label: 'Task Title', width: 240 },
      { id: 'due', label: 'Due Date' },
      { id: 'created', label: 'Created at', width: 380 },
      { id: 'id', label: 'Tasks ID', width: 88 },
    ];

    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    const getList = useCallback(() => {
      setLoading(true);
      setTableData([]);
      setEmpty(false);
      setLoading(false);
    }, []);

    useEffect(() => {
      // 查询参数变化的时候重新查询
      getList();
    }, [getList]);

    useEffect(() => {
      if (table.selected.length === 0) return;

      // 找到 tableData 中的选择项
      const selectedRows = tableData.filter((row) => table.selected.includes(row.sensor_id));

      onSelected?.(selectedRows);
    }, [onSelected, table.selected, tableData]);

    const dataFiltered = applyFilter({
      inputData: tableData,
      comparator: getComparator(table.order, table.orderBy),
      filters,
    });

    const dataInPage = dataFiltered.slice(
      table.page * table.rowsPerPage,
      table.page * table.rowsPerPage + table.rowsPerPage
    );

    const denseHeight = table.dense ? 60 : 80;

    const canReset = !isEqual(defaultFilters, filters);

    const notFound = (!dataFiltered.length && canReset) || empty;

    const handleFilters = useCallback(
      (name: string, value: IDeviceTableFilterValue) => {
        table.onResetPage();
        setFilters((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      },
      [table]
    );

    const handleDeleteRow = useCallback(
      (id: string) => {
        const deleteRow = tableData.filter((row) => row.sensor_id !== id);
        setTableData(deleteRow);

        table.onUpdatePageDeleteRow(dataInPage.length);
      },
      [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
      const deleteRows = tableData.filter((row) => !table.selected.includes(row.sensor_id));
      setTableData(deleteRows);

      table.onUpdatePageDeleteRows({
        totalRows: tableData.length,
        totalRowsInPage: dataInPage.length,
        totalRowsFiltered: dataFiltered.length,
      });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleEditRow = (row: IDeviceItem) => {
      // 最佳实现：根据行 ID 读取行信息，然后 setEditRow
      setEditRow(row);

      quickEdit.onTrue();
    };

    const handleRetrieveKey = (row: IDeviceItem) => {};

    const handleImportKey = (row: IDeviceItem) => {};

    const handleResetFilters = useCallback(() => {
      setFilters(defaultFilters);
    }, [defaultFilters]);

    const onQuickEditFormSubmitted = () => {
      getList();
      quickEdit.onFalse();
    };

    useImperativeHandle(ref, () => ({
      table,
    }));

    return (
    
        <Container maxWidth={'lg'}>


          <Card>
            <DeviceTableToolbar filters={filters} onFilters={handleFilters} />

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.sensor_id)
                  )
                }
                // action={
                //   <Tooltip title={t('Delete')}>
                //     <IconButton color="primary" onClick={confirm.onTrue}>
                //       <Iconify icon="solar:trash-bin-trash-bold" />
                //     </IconButton>
                //   </Tooltip>
                // }
              />

              {/* <Scrollbar> */}
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        tableData.map((row) => row.sensor_id)
                      )
                    }
                  />

                  <TableBody>
                    {loading ? (
                      [...Array(table.rowsPerPage)].map((i, index) => (
                        <TableSkeleton key={i.toString()} sx={{ height: denseHeight }} />
                      ))
                    ) : (
                      dataFiltered
                          .slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .map((row) => (
                            <DeviceTableRow
                              key={row.name}
                              row={row}
                              selected={table.selected.includes(row.sensor_id)}
                              onSelectRow={() => table.onSelectRow(row.sensor_id)}
                              onDeleteRow={() => handleDeleteRow(row.sensor_id)}
                              onSelectLine={onSelectLine}
                              // onEditRow={() => handleEditRow(row.sensor_id)}
                              onEditRow={() => handleEditRow(row)}
                              onRetrieveKey={() => handleRetrieveKey(row)}
                              onImportKey={() => handleImportKey(row)}
                            />
                          ))
                    )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                    />

                    <TableNoData notFound={notFound} />
                  </TableBody>
                </Table>
              {/* </Scrollbar> */}
            </TableContainer>

            <TablePaginationCustom
              count={dataFiltered.length}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
              //
              dense={table.dense}
              onChangeDense={table.onChangeDense}
            />
          </Card>
        </Container>

      
    );
  }
);

export default DeviceListView;

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IDeviceItem[];
  comparator: (a: any, b: any) => number;
  filters: IDeviceTableFilters;
}) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (device) => device.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  // if (sites.length) {
  //   inputData = inputData.filter((device) =>  sites.includes(device.sensor.site));
  // }

  // if (sites.length) {
  //   inputData = inputData.filter((device) => sites.includes(device));
  // }

  return inputData;
}
