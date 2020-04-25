/*
Creat Pagination Array
[1, '...', 21, 22, 23, 24, 24, '...', 30]
@param {int} currentPage : Current Page No.
@param {int} totalPages  : Count of Total No of Pages.

@return {Array} : Array containing the indexes for create pagination
*/

export const createPaginationArray = ( currentPage, totalPages ) => {
	let loopableArray = [];
	let countOfDotItems = 0;

	// If there is only one page, return an empty array
	if ( 1 === totalPages ) return loopableArray;

	// Push the two index items before the current page
	if ( 0 < currentPage - 2 ) {
		loopableArray.push( currentPage - 2 );
	}

	if ( 0 < currentPage - 1 ) {
		loopableArray.push( currentPage - 1 );
	}

	// Push the current page index item
	loopableArray.push(currentPage);

	// Push next two index after the current page
    if ( totalPages > currentPage + 1 ){
    	loopableArray.push( currentPage + 1 );
    }

    if ( totalPages > currentPage + 2 ){
    	loopableArray.push( currentPage + 2 );
    }

    /*
    Push the '...' at the beginning of the array only
    if the difference of between the 1s and 2nd index is greater than 1.
     */
    if ( 1 < loopableArray[0] - 1) {
    	loopableArray.unshift('...');
    	countOfDotItems += 1;
    }

    /*
    Push the '...' at the end of the array only
    if the difference of between the last and 2nd last index is greater than 1.
     */
    if ( 1 < totalPages - loopableArray[loopableArray.length - ( 2 - countOfDotItems)] ) {
    	loopableArray.push('...');
    }

    // Push firt index item in the array if it is does not already exists.
    if( -1 === loopableArray.indexOf(1) ) {
    	loopableArray.unshift(1);
    }

    //Push last index item in the array if it does not already exists
    if( -1 === loopableArray.indexOf(1) ) {
    	loopableArray.push(totalPages);
    }

    return loopableArray;
}