import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

const Pagination = ({ 
    currentPage, 
    totalItems, 
    itemsPerPage, 
    onPageChange,
    showInfo = true 
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);
            
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            // Adjust if we're near the start
            if (currentPage <= 3) {
                endPage = 4;
            }
            
            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            
            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            
            // Always show last page
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="pagination-container">
            <div className="pagination">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    title="Trang trước"
                >
                    <FaChevronLeft />
                </button>
                
                {getPageNumbers().map((pageNum, index) => (
                    <button
                        key={index}
                        onClick={() => typeof pageNum === 'number' ? onPageChange(pageNum) : null}
                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''} ${typeof pageNum !== 'number' ? 'ellipsis' : ''}`}
                        disabled={typeof pageNum !== 'number'}
                    >
                        {pageNum}
                    </button>
                ))}
                
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    title="Trang sau"
                >
                    <FaChevronRight />
                </button>
            </div>

            {showInfo && totalItems > 0 && (
                <div className="pagination-info">
                    Hiển thị {startItem} - {endItem} trong tổng số {totalItems} bản ghi
                </div>
            )}
        </div>
    );
};

export default Pagination; 