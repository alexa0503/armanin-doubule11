let domain;
if (process.env.NODE_ENV === 'development') {
	domain = '//127.0.0.1/armani-double11-serve/';
} else {
	domain = '//www.himyweb.com/armani/api/';
}
export const listUrl = domain + 'index.php?action=list';
export const followUrl = domain + 'index.php?action=follow';
