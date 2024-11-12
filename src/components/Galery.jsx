import BookForm from "./BookForm"
import BookList from "./BooksList"

const Galery = () => {
    return(
        <>
            <BookForm/>
            <h1 className="text-2xl text-center font-bold mb-4">Libros Agregados</h1>
            <BookList/>
        </>
    )
}

export default Galery