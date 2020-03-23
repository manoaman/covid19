import dayjs from 'dayjs'

const headers = [
  { text: 'No', value: 'No' },
  { text: '公表日', value: '公表日' },
  { text: '居住地', value: '居住地' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '退院※', value: '退院', align: 'center' },
  { text: '備考', value: '備考' },
  { text: '詳細', value: '詳細' }
]

type DataType = {
  No: string | null
  リリース日: Date
  居住地: string | null
  年代: string | null
  性別: '男性' | '女性'
  退院: '◯' | null
  備考: string | null
  詳細: string | null
  [key: string]: any
}

type TableDataType = {
  No: DataType['No']
  公表日: string
  居住地: DataType['居住地']
  年代: DataType['年代']
  性別: DataType['性別'] | '不明'
  退院: DataType['退院']
  備考: DataType['備考']
  詳細: DataType['詳細']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      No: d.No ?? '-',
      公表日: dayjs(d['リリース日']).format('MM/DD') ?? '不明',
      居住地: d['居住地'] ?? '不明',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? '不明',
      退院: d['退院'],
      備考: d['備考'],
      詳細: d['詳細']
    }
    // 詳細: '<a href="' + d['詳細'] + '" target="_blank">' + d['詳細'] + '</a>'
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
