// data/projects-data.js
const PROJECTS = [
  {
    id: 'drv-health',
    title: 'Driver Health Analytics',
    short: 'Power BI dashboards for 14,000+ driver records',
    desc: 'Built ETL + reporting pipelines to ingest, clean and visualise driver health and performance metrics.',
    tools: ['SQL','Power BI','Python'],
    github: '#',
    live: '#',
    chart: { type:'bar', labels:['Jan','Feb','Mar','Apr','May','Jun'], values:[120,140,110,160,150,170] }
  },
  {
    id: 'etl-auto',
    title: 'Automated ETL Pipeline',
    short: 'Python + Airflow pipeline for multi-source ingestion',
    desc: 'Designed modular ETL with Airflow schedules, automated schema checks and retryable jobs.',
    tools: ['Python','Airflow','Postgres'],
    github: '#',
    live: '#',
    chart: { type:'line', labels:['W1','W2','W3','W4'], values:[20,40,60,90] }
  },
  {
    id: 'dq-monitor',
    title: 'Data Quality Monitor',
    short: 'Automated QA for schema drift & anomalies',
    desc: 'Implemented QA jobs that flagged schema drift, missing columns and outliers with Slack alerts.',
    tools: ['Pandas','NumPy','MySQL'],
    github: '#',
    live: '#',
    chart: { type:'bar', labels:['Nulls','Invalid','Outliers'], values:[12,5,3] }
  }

  // ➕ To add a new project, just copy one of the objects above and change values
];
