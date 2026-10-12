export const TREE_COMPANIES = [
  {
    name: 'JH Tree Service & Landscaping',
    phone: '9738763925',
    display: '973-876-3925',
    sms: '9738768271',
    towns: ['Randolph'],
  },
  {
    name: "Rod's Tree Services",
    phone: '9739453598',
    display: '973-945-3598',
    sms: null,
    towns: ['Randolph', 'Mount Olive', 'Kinnelon'],
  },
  {
    name: 'All Affordable Tree Service',
    phone: '9738953334',
    display: '973-895-3334',
    sms: null,
    towns: ['Randolph'],
  },
  {
    name: 'Lodema Tree Service',
    phone: '9738759875',
    display: '973-875-9875',
    sms: null,
    towns: ['Randolph', 'Rockaway', 'Rockaway Township', 'Boonton'],
  },
  {
    name: 'T&D Tree Service',
    phone: '9734345557',
    display: '973-434-5557',
    sms: null,
    towns: ['Morristown', 'Morris Township', 'Chatham', 'Madison', 'Florham Park', 'Harding', 'Mendham', 'Randolph', 'Denville', 'Parsippany', 'Boonton', 'Mountain Lakes'],
  },
  {
    name: 'Z Tree Experts',
    phone: '9739108733',
    display: '973-910-8733',
    sms: null,
    towns: ['Boonton', 'Boonton Township', 'Chatham', 'East Hanover', 'Florham Park', 'Montville', 'Mountain Lakes', 'Parsippany'],
  },
  {
    name: 'The Tree Man LLC',
    phone: '9736255352',
    display: '973-625-5352',
    sms: null,
    towns: ['Denville', 'Roxbury'],
  },
  {
    name: 'Elite Tree Services',
    phone: '9736680020',
    display: '973-668-0020',
    sms: null,
    towns: ['Mount Olive', 'Montville', 'Denville', 'Roxbury', 'Wharton', 'Netcong', 'Mount Arlington', 'Kinnelon'],
  },
  {
    name: 'Big Foot Tree Service',
    phone: '9738858000',
    display: '973-885-8000',
    sms: null,
    towns: ['Boonton', 'Boonton Township', 'Butler', 'Denville', 'East Hanover', 'Florham Park', 'Kinnelon', 'Lincoln Park', 'Montville', 'Morris Plains', 'Morristown', 'Mountain Lakes', 'Parsippany', 'Pequannock', 'Riverdale', 'Rockaway'],
  },
  {
    name: 'Seneca Tree Service',
    phone: '9736276378',
    display: '973-627-6378',
    sms: null,
    towns: ['Boonton', 'Butler', 'Chatham', 'Chester', 'Denville', 'East Hanover', 'Harding', 'Jefferson', 'Kinnelon', 'Lincoln Park', 'Long Hill', 'Mendham', 'Mine Hill', 'Montville', 'Morris Plains', 'Morris Township', 'Morristown', 'Mount Arlington', 'Mount Olive', 'Mountain Lakes', 'Netcong', 'Parsippany', 'Pequannock', 'Randolph', 'Riverdale', 'Rockaway', 'Roxbury', 'Washington Township', 'Wharton'],
  },
  {
    name: "Peters Todd's Tree Service",
    phone: '9082049918',
    display: '908-204-9918',
    sms: null,
    towns: ['Chatham', 'Chester', 'Chester Township', 'Florham Park', 'Harding', 'Kinnelon', 'Madison', 'Mendham Township', 'Morristown', 'Mountain Lakes', 'Randolph'],
  },
  {
    name: 'APM Tree Service',
    phone: '9083235741',
    display: '908-323-5741',
    sms: null,
    towns: ['Chatham Township'],
  },
];

export function getTreeCompaniesForTown(town) {
  return TREE_COMPANIES.filter((c) => c.towns.includes(town));
}