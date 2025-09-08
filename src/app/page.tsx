'use client';


import { TaskView } from '@/sections/_task/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Task: Order List</title>
      </Helmet>

      <TaskView />
    </>
  );
}
