document.getElementById('error-messages').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

// search field 

const searchbook = () => {

    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    /* searchField.value = '';
    document.getElementById('book-container').innerHTML = '';
    document.getElementById('result-found').innerText = ''; */
    //console.log(searchText);
    displyError();
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    if (searchText === '') {
        displyError();
    } else {
        toggleSpineer('block')
        document.getElementById('error-messages').style.display = 'none';
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookData(data));

    }

}
// error messages function
const displyError = () => {
    document.getElementById('error-messages').style.display = '';
    document.getElementById('input-field').value = '';
    document.getElementById('book-container').innerHTML = '';
    document.getElementById('result-found').innerText = '';
    toggleSpineer('none');
    return;



}
// spinner function 
const toggleSpineer = (displyText) => {
    document.getElementById('spinner').style.display = displyText;

}

// Show books  
const displayBookData = (books) => {
    const bookFound = books.numFound;
    console.log(bookFound);
    // searching reult is not found 
    if (bookFound === 0) {
        displyError();

    } else {
        const showBooks = books.docs.slice(0, 24);
        // console.log(showBook);
        document.getElementById('result-found').innerText = ` show result ${showBooks.length}  of  total book found ${bookFound} `
        const bookContainer = document.getElementById('book-container');
        bookContainer.innerText = '';
        showBooks?.forEach(book => {
            console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        
        <div>
                    
                        <div class="card h-100">
                            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'Not images available'}-M.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h4 class="card-title">${book.title ? book.title : 'Book Title not available'}</h5>
                                    <h5 class="card-title">${book.author_name ? book.author_name : 'Not available author name'}</h5>
                                    <h6 class="card-title">${book.publisher ? book.publisher : 'Not available information '}</h5>
                                        <p class="card-text">Publish Date:${book.publish_date ? book.publish_date : ' Publish date is Not available'}</p>
                                        <p class="card-text">Publish year:${book.first_publish_year ? book.first_publish_year : 'Not available year'}</p>
                                        
                        </div>
                    </div>



                </div>
        `;
            bookContainer.appendChild(div);
            toggleSpineer('none');



        });

    }



}