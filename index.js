class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    static displayBooks(){
// const StoredBooks=[
//     {
//         title:"My Life story",
//         author:"Riteshwari",
//         isbn:"350"
//     },
//     {
//         title:"Life solution",
//         author:"Riteshwari",
//         isbn:"5000"
//     },
//     {
//         title:"Indian food recipe",
//         author:"Riteshwari",
//         isbn:"200"
//     }
    
//     ];
    const books=Store.getBooks();
    books.forEach(book=>UI.addBookToList(book))
}
static addBookToList(book){
    const list=document.querySelector("#book-list");
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
}
static clearFields(){
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
   document.querySelector("#isbn").value="";

}
static deleteBook(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }
}
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn=== isbn){
              books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}



document.addEventListener('DOMContentLoaded',UI.displayBooks)
document.querySelector("#book-form").addEventListener("submit",e=>{
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;
    
    if(title==="" || author==="" || isbn===""){
        alert("all fields are mandatory");
    }else{
        const book=new Book(title,author,isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearFields();
    }

})
document.querySelector("#book-list").addEventListener('click',e=>{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})