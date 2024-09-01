const Pagination = ({ vendorsPerPage, totalVendors, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalVendors / vendorsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex justify-center items-center cursor-pointer">
        <ul className='inline-flex items-center -space-x-px'>
          {pageNumbers.map(number => (
            <li key={number} className='px-3 py-2 leading-tight text-[#E2E2B6] bg-[#021526] rounded-md'
            onClick={() => paginate(number)}>
                {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;