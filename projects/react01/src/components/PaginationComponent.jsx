import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import { useState } from 'react';

function PaginationComponent({ min = 1, max = 10 }) {
    // State to manage active page
    const [page, setPage] = useState(min);

    // Define the maximum number of visible pages
    const visiblePages = 5;

    // Handler to move to previous page
    const handlePrev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, min));
    };

    // Handler to move to next page
    const handleNext = () => {
        setPage((prevPage) => Math.min(prevPage + 1, max));
    };

    // Calculate the start and end of visible page range
    const startPage = Math.max(page - Math.floor(visiblePages / 2), min);
    const endPage = Math.min(startPage + visiblePages - 1, max);

    // Adjust startPage if endPage exceeds max
    const adjustedStartPage = Math.max(endPage - visiblePages + 1, min);

    return (
        <Pagination>
            {/* Previous button */}
            <Pagination.Prev onClick={handlePrev} disabled={page === min} />

            {/* Page numbers dynamically calculated */}
            {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => {
                const pageNumber = adjustedStartPage + index;
                return (
                    <Pagination.Item
                        key={pageNumber}
                        active={page === pageNumber}
                        onClick={() => setPage(pageNumber)}
                    >
                        <a
                            href={`/p${pageNumber}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {pageNumber}
                        </a>
                    </Pagination.Item>
                );
            })}

            {/* Next button */}
            <Pagination.Next onClick={handleNext} disabled={page === max} />
        </Pagination>
    );
}

PaginationComponent.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
};

export default PaginationComponent;