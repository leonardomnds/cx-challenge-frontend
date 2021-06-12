import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

import { Container } from './styles';

interface TableColumn {
  id: string;
  name: string;
  align?: 'center' | 'left' | 'right';
  format?: (v: any) => string;
}

interface TableProps {
  tableColumns: TableColumn[];
  tableRows: any[];
  onEdit?: (v: number) => void;
  onDelete?: (v: number) => void;
}

const Table: React.FC<TableProps> = ({
  tableColumns, tableRows, onEdit, onDelete,
}: TableProps) => (

  <Container>
    <table>

      <thead>
        <tr>
          {tableColumns.map((col) => (
            <th
              key={col.id}
              className={col.align || 'left'}
            >
              {col.name}
            </th>
          ))}
          {(onEdit || onDelete) && <th className="right"> </th>}
        </tr>
      </thead>

      <tbody>
        {tableRows.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'diff' : ''}>
            {tableColumns.map((col) => {
              const value = row[col.id];
              return (
                <td className={col.align || 'left'}>
                  {col.format ? col.format(value) : value}
                </td>
              );
            })}
            {(onEdit || onDelete)
            && (
            <td className="right">
              {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(rowIndex)}
              >
                <FiEdit size={20} />
              </button>
              )}
              {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(rowIndex)}
              >
                <MdDelete size={20} />
              </button>
              )}
            </td>
            )}
          </tr>
        ))}
      </tbody>

    </table>

  </Container>

);

export default Table;
