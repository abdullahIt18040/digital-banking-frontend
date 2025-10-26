'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaFilter } from 'react-icons/fa';

interface RowData {
  [key: string]: string | number;
}

const ExcelDataGridComponent: React.FC = () => {
  const [columns, setColumns] = useState<TableColumn<RowData>[]>([]);
  const [data, setData] = useState<RowData[]>([]);
  const [filteredData, setFilteredData] = useState<RowData[]>([]);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [filterCondition, setFilterCondition] = useState<string>('equals');
  const [filterValue, setFilterValue] = useState<string>('');
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const popupRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData: RowData[] = XLSX.utils.sheet_to_json(ws);

      setData(jsonData);
      setFilteredData(jsonData);

      if (jsonData.length > 0) {
        const cols = Object.keys(jsonData[0]).map((key) => ({
          name: (
            <div className="flex items-center gap-2">
              {key}
              <FaFilter
                className="cursor-pointer hover:text-blue-600"
                onClick={(e) => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
                  setActiveColumn(activeColumn === key ? null : key);
                  setFilterCondition('equals');
                  setFilterValue('');
                }}
              />
            </div>
          ),
          selector: (row: RowData) => row[key],
          sortable: true,
        }));
        setColumns(cols);
      }
    };
    reader.readAsBinaryString(file);
  };

  const applyFilter = () => {
    if (!activeColumn || !filterValue) return;

    const filtered = data.filter((row) => {
      const cellValue = row[activeColumn]?.toString().toLowerCase();
      const searchValue = filterValue.toLowerCase();

      switch (filterCondition) {
        case 'equals':
          return cellValue === searchValue;
        case 'not_equals':
          return cellValue !== searchValue;
        case 'starts_with':
          return cellValue?.startsWith(searchValue);
        case 'ends_with':
          return cellValue?.endsWith(searchValue);
        case 'contains':
          return cellValue?.includes(searchValue);
        default:
          return true;
      }
    });

    setFilteredData(filtered);
    setActiveColumn(null);
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilteredData(data);
    setActiveColumn(null);
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActiveColumn(null);
      }
    };

    if (activeColumn) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeColumn]);

  return (
      <div className="min-h-screen bg-gray-100 p-6 mb-5">
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Excel Data Grid</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />

      {activeColumn && (
        <div
          ref={popupRef}
          className="absolute bg-white border rounded shadow p-4 w-64 z-20"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <h4 className="font-semibold mb-2">Filter: {activeColumn}</h4>

          <label className="block text-sm mb-2">Condition:</label>
          <select
            className="w-full p-2 border rounded mb-3"
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="equals">Equals</option>
            <option value="not_equals">Not Equals</option>
            <option value="starts_with">Starts With</option>
            <option value="ends_with">Ends With</option>
            <option value="contains">Contains</option>
          </select>

          <label className="block text-sm mb-2">Value:</label>
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <div className="flex justify-between">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={applyFilter}
            >
              Apply
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={clearFilter}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        className="bg-white rounded shadow"
      />
    </div>
    </div>
   
  );
};

export default ExcelDataGridComponent;
