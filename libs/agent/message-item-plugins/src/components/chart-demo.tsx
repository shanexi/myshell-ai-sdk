import ReactECharts from 'echarts-for-react';

export const LineChartDemo = () => {
  const option = {
    title: {
      text: 'Sample Line Chart',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export const BarChartDemo = () => {
  const option = {
    title: {
      text: 'Sample Bar Chart',
    },
    tooltip: {},
    xAxis: {
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [5, 20, 36, 10],
        itemStyle: {
          color: '#91cc75',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export const ChartDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <LineChartDemo />
      <BarChartDemo />
    </div>
  );
};
