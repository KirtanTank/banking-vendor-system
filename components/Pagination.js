const Pagination = ({ vendorsPerPage, totalVendors, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalVendors / vendorsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex justify-center items-center py-10 cursor-pointer">
        <ul className='inline-flex items-center -space-x-px'>
          {pageNumbers.map(number => (
            <li key={number} className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-md'
            onClick={() => paginate(number)}>
                {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;