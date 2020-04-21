export const isLoggedIn = () => {
	return localStorage.getItem( 'token' );
};

export const getUserName = () => {
	return localStorage.getItem( 'userName' );
};