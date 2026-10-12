import * as Location from 'expo-location';

export async function getCurrentTown() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        console.log('Location permission denied');
        return null;
    }

    const position = await Location.getCurrentPositionAsync({});

    const results = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    });

    if (results.length === 0) {
        return null;
    }

    return results[0].city;
}

// Source: Morris County Office of Emergency Management official directory
// (morriscountynj.gov), plus individual town/agency pages for Harding and
// Victory Gardens, which aren't on the county's list. Verified as of this build.
export const MORRIS_COUNTY_CONTACTS = {
    Boonton: [{ name: 'Boonton Police', phone: '9734029410', display: '973-402-9410 ext. 600' }],
    'Boonton Township': [{ name: 'Boonton Township Police', phone: '9734024000', display: '973-402-4000' }],
    Butler: [{ name: 'Butler Police', phone: '9738384100', display: '973-838-4100' }],
    Chatham: [{ name: 'Chatham Borough Police', phone: '9736358000', display: '973-635-8000' }],
    'Chatham Township': [{ name: 'Chatham Township Police', phone: '9733770100', display: '973-377-0100' }],
    Chester: [{ name: 'Chester Borough Police', phone: '9088795626', display: '908-879-5626' }],
    'Chester Township': [{ name: 'Chester Township Police', phone: '9088795514', display: '908-879-5514' }],
    Denville: [{ name: 'Denville Police', phone: '9736274900', display: '973-627-4900' }],
    Dover: [{ name: 'Dover Police', phone: '9733660302', display: '973-366-0302' }],
    'East Hanover': [{ name: 'East Hanover Police', phone: '9738870432', display: '973-887-0432' }],
    'Florham Park': [{ name: 'Florham Park Police', phone: '9733773300', display: '973-377-3300' }],
    Hanover: [{ name: 'Hanover Township Police', phone: '9734282512', display: '973-428-2512' }],
    Harding: [{ name: 'Harding Township Police', phone: '9734550500', display: '973-455-0500' }],
    Jefferson: [{ name: 'Jefferson Township Police', phone: '9736971300', display: '973-697-1300' }],
    Kinnelon: [{ name: 'Kinnelon Police', phone: '9738385400', display: '973-838-5400' }],
    'Lincoln Park': [{ name: 'Lincoln Park Police', phone: '9736945533', display: '973-694-5533' }],
    'Long Hill': [{ name: 'Long Hill Township Police', phone: '9086471800', display: '908-647-1800' }],
    Madison: [{ name: 'Madison Police', phone: '9735933000', display: '973-593-3000' }],
    Mendham: [{ name: 'Mendham Borough Police', phone: '9735432527', display: '973-543-2527' }],
    'Mendham Township': [{ name: 'Mendham Township Police', phone: '9734551700', display: '973-455-1700' }],
    'Mine Hill': [{ name: 'Mine Hill Police', phone: '9733667414', display: '973-366-7414' }],
    Montville: [{ name: 'Montville Township Police', phone: '9733342730', display: '973-334-2730' }],
    'Morris Plains': [{ name: 'Morris Plains Police', phone: '9735382284', display: '973-538-2284' }],
    'Morris Township': [{ name: 'Morris Township Police', phone: '9735390777', display: '973-539-0777' }],
    Morristown: [{ name: 'Morristown Police', phone: '9732926614', display: '973-292-6614' }],
    'Mount Arlington': [{ name: 'Mount Arlington Police', phone: '9733980139', display: '973-398-0139' }],
    'Mount Olive': [{ name: 'Mount Olive Police', phone: '9736910850', display: '973-691-0850' }],
    'Mountain Lakes': [{ name: 'Mountain Lakes Police', phone: '9733341413', display: '973-334-1413' }],
    Netcong: [{ name: 'Netcong Police', phone: '9733477700', display: '973-347-7700' }],
    Parsippany: [{ name: 'Parsippany-Troy Hills Police', phone: '9732634300', display: '973-263-4300' }],
    Pequannock: [{ name: 'Pequannock Township Police', phone: '9738351700', display: '973-835-1700' }],
    Randolph: [{ name: 'Randolph Township Police', phone: '9739897000', display: '973-989-7000' }],
    Riverdale: [{ name: 'Riverdale Police', phone: '9738350034', display: '973-835-0034' }],
    Rockaway: [{ name: 'Rockaway Borough Police', phone: '9736271314', display: '973-627-1314' }],
    'Rockaway Township': [{ name: 'Rockaway Township Police', phone: '9736254000', display: '973-625-4000' }],
    Roxbury: [{ name: 'Roxbury Township Police', phone: '9735846400', display: '973-584-6400' }],
    'Victory Gardens': [{ name: 'NJ State Police (Netcong Barracks — serves Victory Gardens)', phone: '9733471000', display: '973-347-1000' }],
    'Washington Township': [{ name: 'Washington Township Police', phone: '9088763232', display: '908-876-3232' }],
    Wharton: [{ name: 'Wharton Police', phone: '9733665893', display: '973-366-5893' }],
};

export const MORRIS_COUNTY_OEM = {
    name: 'Morris County Office of Emergency Management',
    phone: '9738298600',
    display: '1-973-829-8600',
};

let selectedTown = null;

export function setSelectedTown(town) {
    selectedTown = town;
}

export function getSelectedTown() {
    return selectedTown;
}