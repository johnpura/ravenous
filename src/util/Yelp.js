const apiKey = 'Ubt0cwFOy6Bg_WfJqs0W5ZYsidMdXqOuEm82LHOvVDo4leYBnMtXkjZJpD0olnTpVd4_P_Qq2Et7ZTYvhqMG4t9J55i7Dgbi3V1wwkxLgTiwHjx15jk0-DfCu75XW3Yx';

const Yelp = {
    search(term, location, sortBy) {
        const corsAnywhere  = 'https://cors-anywhere.herokuapp.com/';
        const endpoint = `${corsAnywhere}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const headers = { headers: {Authorization: `Bearer ${apiKey}`} };
        return fetch(endpoint, headers).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => (
                    {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                ));
            } else {
                return [];
            }
        });
    }
};

export default Yelp;