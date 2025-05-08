interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
}

const DataTable = ({ columns, data, onRowClick }: DataTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row, i) => (
              <tr 
                key={i} 
                className={`hover:bg-green-50 transition-colors duration-200 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map(column => (
                  <td 
                    key={column.key} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                  >
                    {column.render ? column.render(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;