// eslint-disable-next-line consistent-return
export const getPeriodLabals = (period: string) => {
  //    a. Current Day (value: Today) // 一个整数
  //    b. Last 7 Days (value: 7days)
  //    c. Current Month (value: current_month)
  //    d. By Dates (value: Dates) --> will be listed as 1, 2, 3, 4, 5, 6, 7, 8, 9 … 31 (for last 365 days)
  //    e. By Day (value: Days) --> will be listed as 1,2,3,4,5,6,7 (1 - Mon to 7-Sunday)
  //    f. By Month (value: monthly) will be listed as 1, 2, 3 .. 12 (for last 365 days)
  //    g. By Hour (Last 7 Days) (value: hour) will be listed as 00:00 .. 23:00
  //    h. By Hour (Last Month) (value: hour) will be listed as 00:00 .. 23:00
  //    i. By Hour (Last 3 Months) (value: hour) will be listed as 00:00 .. 23:00
  //    j. By Hour (Last 6 Months) (value: hour) will be listed as 00:00 .. 23:00
  //    k. By Hour (Last 12 Months) (value: hour) will be listed as 00:00 .. 23:00
  if (period === 'today') {
    // 返回 24 个小时
    return [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];
  }
  if (period === '7days') {
    // 返回 7 个天
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
  if (period === 'current_month') {
    // 返回 这个月的 30 天
    const now = new Date();
    // 确认这个月有多少天
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    // 返回 YYYY-MM-DD 的数组
    return Array.from(
      { length: days },
      (v, k) => `${now.getFullYear()}-${now.getMonth() + 1}-${k + 1}`
    );
    // } else if (period === 'Dates') {
    //   return ['1', '2', '3', '4', '5', '6', '7'];
  }
  if (period === 'Days') {
    // 返回周一到周日
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
  if (period === 'monthly') {
    // 返回十二个月份
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  if (period === '7days-hour') {
    // 返回 七天 168 个小时 ?
    return [];
  }
  if (period === 'current_month-hour') {
    // 返回 30 天 720 个小时 ?
    return [];
  }
  if (period === '3months-hour') {
    // 返回 90 天 2160 个小时 ?
    return [];
  }
  if (period === '6months-hour') {
    // 返回 180 天 4320 个小时 ?
    return [];
  }
  if (period === '12months-hour') {
    // 返回 365 天 8760 个小时 ?
    return [];
  }

  return [];
};
