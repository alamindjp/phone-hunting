const searchPhone = () => {
    // debugger;
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText)
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
        // .catch(error => displayError(error))

    }

}
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
                    <button onclick="phoneDetails('${phone.slug}')" class="btn bg-info mt-3 w-50" type="button" id="details-button">Details</button>
                </div>
            </div>  
        `
            searchResult.appendChild(div)
        });
    }
}
