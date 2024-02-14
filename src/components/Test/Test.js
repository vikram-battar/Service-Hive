import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [{ id: 1, name: 'John Doe', age: 25 }, { id: 2, name: 'Jane Doe', age: 30 }];

const columns = [
  { name: 'ID', selector: 'id' },
  { name: 'Name', selector: 'name' },
  { name: 'Age', selector: 'age' },
  {
    name: 'Actions',
    cell: (row) => <DropdownCell row={row} />,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const DropdownCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const handleEdit = () => alert(`Edit ${row.name}`);
  const handleDelete = () => alert(`Delete ${row.name}`);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={handleClick}>Actions</button>
      {isOpen && (
        <div className="dropdown">
          <ul>
            <li onClick={handleEdit}>Edit</li>
            <li onClick={handleDelete}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const MyTable = () => {
  return <DataTable title="My Table" data={data} columns={columns} />;
};

export default MyTable;
