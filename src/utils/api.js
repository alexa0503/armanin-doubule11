let domain;
if (process.env.NODE_ENV === 'development') {
	domain = '//127.0.0.1/armani-double11-serve/';
} else {
	// domain = 'http://campaign.giorgioarmanibeauty.cn/double112018star/api/';
	domain = 'https://www.himyweb.com/armani/api/';
}
export const listUrl = domain + 'index.php?action=list';
export const followUrl = domain + 'index.php?action=follow';
export const voteUrl = domain + 'index.php?action=vote';
export const loginUrl = domain + 'index.php?action=login';
export const userUrl = domain + 'index.php?action=user';
export const infoUrl = domain + 'index.php?action=info';
