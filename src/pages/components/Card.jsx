import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
const Card = ({book}) => {
  console.log(book)
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg my-10" key={book._id}>
  <img class="w-full" src={book.imageUrl ? book.imageUrl :"https://th.bing.com/th/id/OIP.hv0kWInOxmefPrb6hvzA9AHaHa?rs=1&pid=ImgDetMain" } alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{book.bookName}</div>
    <p class="text-gray-700 text-base">
      Rs.{book.bookPrice} 
    </p>
    <p class="text-gray-700 text-base">
      {book.isbnNumber}
    </p>
    <button><Link to={`/book/${book._id}`}>See More</Link></button>
  </div>
</div>
  )
}

export default Card