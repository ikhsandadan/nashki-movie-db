"use client";
import React from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

const Pagination = ({ setCurrentPage, totalPages, currentPage }) => {
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const showNextButton = currentPage !== totalPages;
    const showPrevButton = currentPage !== 1;

    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition:{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.5
            }
        }
    }
    return (
        <motion.div 
                variants={paginationVariants} 
                initial="hidden"
                animate="visible"
            >
                <ReactPaginate
                    breakLabel={
                        <span className="mr-4">...</span>
                    }
                    nextLabel={showNextButton ? (
                            <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-black hover:bg-black hover:border hover:border-solid hover:border-gray-200 hover:text-white">
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </span>
                        ) : (null)
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
                    previousLabel={showPrevButton ? (
                            <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md mr-4  text-black hover:bg-black hover:border hover:border-solid hover:border-gray-200 hover:text-white">
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </span>
                        ) : (null)
                    }
                    renderOnZeroPageCount={null}
                    containerClassName="flex items-center justify-center mt-8 mb-4 text-white"
                    pageClassName="block border border-solid border-gray-200 hover:bg-gray-100 hover:text-black w-10 h-10 flex items-center justify-center rounded-md mr-4"
                    activeClassName="bg-gray-100 text-black font-semibold"
                />
            </motion.div>
    )
};

export default Pagination;