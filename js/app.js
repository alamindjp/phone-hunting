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
