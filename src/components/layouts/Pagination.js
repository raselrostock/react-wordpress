import React from 'react';
import { Link } from '@reach/router';

import { createPaginationArray } from '../../utils/functions';

export const Pagination = ( props ) => {

	const { currentPage, totalPages, setCurrentPage } = props;

	const isThereNextPage = currentPage < totalPages;
	const isTherePreviousPage = currentPage > 1;
	const paginationArray = createPaginationArray( currentPage, totalPages );

	const getPageLink = ( pageNo ) => {
		return `/page/${pageNo}`;
	}

	return (
		<div className="pagination">
			{ isTherePreviousPage && 
				<Link to={ getPageLink( currentPage - 1 )}
					onClick={ ()=> setCurrentPage( currentPage - 1 ) }
					className="prev"
				>
					Previous
				</Link>
			}

			{
				paginationArray && 
				paginationArray.map( (item, index ) => {
					if( '...' !== item && currentPage !== item ){
						return (
							<React.Fragment key={ `${ item }-${ index }`}>
								<Link
									to={ getPageLink( item )}
									onClick={ ()=> setCurrentPage( item ) }
								>
									<span className="page-no"> { item }</span>
								</Link>
							</React.Fragment>
						);
					}
					else {
						return (
							<span key={ `${ item }-${ index }`}>
								<span className={ currentPage === item ? 'page-no active' : ''}>
									{ item }
								</span>
							</span>
						);
						
					}
				})
			}
			{ isThereNextPage && 
				<Link to={ getPageLink( currentPage + 1 ) } 
					onClick={ () => setCurrentPage( currentPage + 1 ) } 
					className="next"
				>
					Next
				</Link> 
			}
		</div>
	);
}