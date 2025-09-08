'use client';


import { DeviceView } from '@/sections/_device/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Order List</title>
      </Helmet>

      <DeviceView />
    </>
  );
}
