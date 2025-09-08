'use client';

import isEqual from 'lodash/isEqual';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
// routes
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSkeleton,
  useTable,
} from 'src/components/table';
// types
import type { ITaskItem, ITaskTableFilters, ITaskTableFilterValue } from 'src/types/task';
//
// import { useLocales } from 'src/locales';
import TaskTableRow from 'src/sections/_task/task-table-row';
import TaskTableToolbar from 'src/sections/_task/task-table-toolbar';

// hooks
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useAutoIncrementId } from 'src/hooks/use-auto-increment-id';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

const TaskListView = forwardRef(
  (
    {
      defaultFilters = {
        status: '',
      },
      onSelectLine,
      onAddTask,
      onDeleteTask,
    }: {
      defaultFilters?: ITaskTableFilters;
      onSelectLine?: (selected: string[]) => void;
      onAddTask?: () => void;
      onDeleteTask?: () => void;
    },
    ref
  ) => {
    const table = useTable();

    // 使用 localStorage 管理任务数据
    const localStorage = useLocalStorage('tasks', { tasks: [] as ITaskItem[] });
    const tableData = localStorage.state.tasks;
    
    // 使用自增 ID
    const autoIncrementId = useAutoIncrementId('taskAutoId', 1);
    
    const [filters, setFilters] = useState(defaultFilters);

    // 表头
    const TABLE_HEAD = [
      { id: 'title', label: 'Task Title', width: 240 },
      { id: 'due', label: 'Due Date', width: 200 },
      { id: 'created', label: 'Created at', width: 200 },
      { id: 'id', label: 'Tasks ID', width: 80, align: 'right' as const },
    ];

    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    const getList = useCallback(() => {
      setLoading(true);
      setEmpty(tableData.length === 0);
      setLoading(false);
    }, [tableData.length]);

    // 添加新任务
    const handleAddTask = useCallback(() => {
      const taskId = autoIncrementId.getNextId();
      const newTask: ITaskItem = {
        title: `Task ${taskId}`,
        due: undefined,
        created: new Date(),
        id: taskId.toString(),
      };

      const updatedTasks = [...tableData, newTask];
      localStorage.update('tasks', updatedTasks);
      
      // 调用外部回调
      onAddTask?.();
    }, [tableData, localStorage, onAddTask, autoIncrementId]);

    const handleDeleteTask = useCallback(() => {
      // 删除所有任务
      localStorage.update('tasks', []);
      
      // 重置表格状态
      table.onResetPage();

      onDeleteTask?.();
    }, [localStorage, onDeleteTask, table]);

    useEffect(() => {
      // 查询参数变化的时候重新查询
      getList();
    }, [getList]);

    // 移除多选相关的useEffect

    const dataFiltered = applyFilter({
      inputData: tableData,
      filters,
    });

    const dataSorted = applySorting({
      inputData: dataFiltered,
      orderBy: table.orderBy,
      order: table.order,
    });

    // const dataInPage = dataFiltered.slice(
    //   table.page * table.rowsPerPage,
    //   table.page * table.rowsPerPage + table.rowsPerPage
    // );

    const denseHeight = table.dense ? 60 : 80;

    const canReset = !isEqual(defaultFilters, filters);

    const notFound = (!dataFiltered.length && canReset) || empty;

    const handleFilters = useCallback(
      (name: string, value: ITaskTableFilterValue) => {
        table.onResetPage();
        setFilters((prevState: ITaskTableFilters) => ({
          ...prevState,
          [name]: value,
        }));
      },
      [table]
    );

    // 处理任务完成状态切换
    const handleTaskComplete = useCallback(
      (id: string) => {
        const updatedTasks = tableData.map((task: ITaskItem) => {
          if (task.id === id) {
            return {
              ...task,
              due: task.due ? undefined : new Date(), // 如果已完成则取消完成，否则标记为完成
            };
          }
          return task;
        });
        localStorage.update('tasks', updatedTasks);
      },
      [tableData, localStorage]
    );

    // 处理排序
    const handleSort = useCallback((field: string) => {
      if (table.orderBy === field) {
        // 如果点击的是当前排序字段
        if (table.order === 'asc') {
          // 第二次点击：从升序切换到降序
          table.setOrder('desc');
        } else if (table.order === 'desc') {
          // 第三次点击：取消排序
          table.setOrderBy('');
          table.setOrder('asc'); // 重置为默认升序状态
        }
      } else {
        // 第一次点击新字段：设置为升序
        table.setOrderBy(field);
        table.setOrder('asc');
      }
    }, [table]);

    // const handleDeleteRows = useCallback(() => {
    //   const updatedTasks = tableData.filter((row) => !table.selected.includes(row.sensor_id));
    //   localStorage.update('tasks', updatedTasks);

    //   table.onUpdatePageDeleteRows({
    //     totalRows: tableData.length,
    //     totalRowsInPage: dataInPage.length,
    //     totalRowsFiltered: dataFiltered.length,
    //   });
    // }, [dataFiltered.length, dataInPage.length, table, tableData, localStorage]);

    // const handleEditRow = (row: ITaskItem) => {
    //   // 最佳实现：根据行 ID 读取行信息，然后 setEditRow
    //   setEditRow(row);

    //   quickEdit.onTrue();
    // };

    // const handleRetrieveKey = (row: ITaskItem) => {};

    // const handleImportKey = (row: ITaskItem) => {};

    // const handleResetFilters = useCallback(() => {
    //   setFilters(defaultFilters);
    // }, [defaultFilters]);

    // const onQuickEditFormSubmitted = () => {
    //   getList();
    //   quickEdit.onFalse();
    // };

    useImperativeHandle(ref, () => ({
      table,
    }));

    return (
    
        <Container maxWidth={'lg'}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Tasks
          </Typography>

          <Card>
            <TaskTableToolbar filters={filters} onFilters={handleFilters} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onSort={handleSort} orderBy={table.orderBy} order={table.order} />

            <TableContainer  sx={{ position: 'relative', overflow: 'unset' }}>
              {/* <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row: ITaskItem) => row.id)
                  )
                }
              /> */}
              {/* <Scrollbar> */}
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    onSort={handleSort}
                  />

                  <TableBody>
                    {loading ? (
                      [...Array(table.rowsPerPage)].map((_, index) => (
                        <TableSkeleton key={index.toString()} sx={{ height: denseHeight }} />
                      ))
                    ) : (
                      dataSorted
                          .slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .map((row: ITaskItem) => (
                            <TaskTableRow
                              key={row.id}
                              row={row}
                              selected={row.due !== undefined}
                              onSelectRow={() => handleTaskComplete(row.id)}
                              onSelectLine={onSelectLine}
                              // onEditRow={() => handleEditRow(row.sensor_id)}
                              onEditRow={() => {}}
                              onRetrieveKey={() => {}}
                              onImportKey={() => {}}
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

export default TaskListView;

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
}: {
  inputData: ITaskItem[];
  filters: ITaskTableFilters;
}) {
  const { status } = filters;

  if (status) {
    if (status === 'all') {
      return inputData;
    }else if (status === 'active') {
      return inputData.filter((task: ITaskItem) => !task.due);
    }else if (status === 'completed') {
      return inputData.filter((task: ITaskItem) => task.due);
    }
  }


  return inputData;
}

// ----------------------------------------------------------------------

function applySorting({
  inputData,
  orderBy,
  order,
}: {
  inputData: ITaskItem[];
  orderBy: string;
  order: 'asc' | 'desc';
}) {
  const sorted = [...inputData].sort((a: ITaskItem, b: ITaskItem) => {
    let comparison = 0;

    switch (orderBy) {
      case 'due': {
        // Handle null/undefined values - put them at the end
        if (!a.due && !b.due) comparison = 0;
        else if (!a.due) comparison = 1;
        else if (!b.due) comparison = -1;
          else comparison = dayjs(a.due).diff(dayjs(b.due));
        break;
      }
      case 'created': {
        if (!a.created && !b.created) comparison = 0;
        else if (!a.created) comparison = 1;
        else if (!b.created) comparison = -1;
        else comparison = dayjs(a.created).diff(dayjs(b.created));
        break;
      }
      case 'id': {
        comparison = a.id.localeCompare(b.id, undefined, { numeric: true });
        break;
      }
      case 'title': {
        comparison = a.title.localeCompare(b.title);
        break;
      }
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}
