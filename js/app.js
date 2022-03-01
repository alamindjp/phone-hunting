/* 
search area
  
*/
const searchPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    searchField.value = '';
    document.getElementById('phone-details').textContent = '';
    document.getElementById('search-result').textContent = ''
    if (searchText == '') {
        const errorField = document.getElementById('search-result')
        const errorMassage = document.createElement('div')
        errorMassage.innerHTML = `<p class="text-center text-danger fs-2 fw-bold"> Enter Your Interested Phone Name</p >`
        errorField.appendChild(errorMassage);
        // console.log('test');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => searchResultDisplay(data.data.slice(0, 20)))

    }

}

/* 
search result area  
*/
const searchResultDisplay = phones => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    if (!phones.length) {
        const errorField = document.getElementById('search-result')
        const errorMassage = document.createElement('div')
        errorMassage.innerHTML = `<p class="text-center text-danger fs-2 fw-bold"> Result not found</p >`
        errorField.appendChild(errorMassage);
        // console.log('test')

    }
    else {
        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div')
            div.classList.add('col-lg-4')
            div.classList.add('col-sm-6')
            div.innerHTML = `
            <div id="phone-card" class="border-0 shadow-lg mx-3 card h-100">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-5" alt="...">
                <div class="card-body ms-2 my-3">
                    <h5 class="card-title ">${phone.phone_name}</h5>
                    <h4 class="card-text">${phone.brand}</h4>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn bg-info mt-3 w-50 " type="button" id="details-button">Details</button>
                </div>
            </div>  
        `
            searchResult.appendChild(div)
        });
    }
}
/*
 id link arrow function  
*/
const phoneDetails = (id) => {
    // debugger;
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())

        .then(data => displayPhoneDetail(data.data));
}

/*
 phone details 
*/
const displayPhoneDetail = phone => {
    // debugger;
    // console.log(phone.others)
    const others = phone.others
    if (!others) {
        return
    }
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="w-50 mx-auto pt-5" alt="...">
    <div class="card-body">
        <p class="text-center">${phone.releaseDate}</p>
        <h2 class="card-title mb-4 text-center">${phone.name}</h2>
        <h4 class="card-title"><b>brand : ${phone.brand}</b></h4>
        <h5 class=""><b>Specification :</b><h5>
        <div class="ms-2 mb-3">
            <p class="mb-1"><b>Memory :</b> ${phone.mainFeatures.memory}</p>
            <p class="mb-1"><b>Storage :</b> ${phone.mainFeatures.storage}</p>
            <p class="mb-1"><b>Processor  :</b> ${phone.mainFeatures.chipSet}</p>
            <p class="mb-1"><b>Display :</b> ${phone.mainFeatures.displaySize}</p>
            <h5 class=""><b>Sensors :</b>
                <p class="mb-1 ms-2">${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}</p>
                <p class="mb-1 ms-2">${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[5]}, ${phone.mainFeatures.sensors[4]}</p>
            <h5>
            <h5 class=""><b>Other :</b>
                <p class="mb-1 ms-2">${others.WLAN},</p>
                <p class="mb-1 ms-2">${others.Bluetooth},</p>
                <p class="mb-1 ms-2">${others.GPS},</p>
            <h5>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}

/*
 THE END 
*/