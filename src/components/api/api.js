export async function API(location, cuisine, diet) {

    const {Place} = await google.maps.importLibrary("places");
  
    const request = {
        textQuery: `${diet} restaurants in ${location}`,
        fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', "photos", "rating", "regularOpeningHours"],
        includedType: '', // Restrict query to a specific type (leave blank for any).
        useStrictTypeFiltering: true,
        locationBias: new google.maps.LatLng(43.6532, -79.3832),
        isOpenNow: true,
        language: 'en-US',
        maxResultCount: 9,
        minRating: 1,
        region: 'ca',
    };

    const response = await Place.searchByText(request);

    console.log("Places API response:", response);

    return response.places ?? [];
}