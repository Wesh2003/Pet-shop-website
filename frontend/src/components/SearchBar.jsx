import React, { useState } from 'react'

function SearchBar({jobs}) {
    const [input,setInput] = useState("")
    const [filteredData, setFilteredData] = useState([]);
    const handleSearch = () => {
        const searchTerm = input.toLowerCase();

        if (searchTerm.trim() === '') {
            setFilteredData([]);
        } else {
            const filtering = jobs.filter((item) =>
                (item.title || '').toLowerCase().includes(searchTerm)
            );

            if (filtering.length === 0) {
                alert("Sorry, we don't have those jobs available.");
            }

            setFilteredData(filtering);
        }
    };


  return (
    <div>
        <input 
        type="text" 
        placeholder='Search...'
        value={input}
        onChange={(e)=>setInput(e.target.value)}

        
        />
        <button onClick={handleSearch}>Search</button>

        <ul>
        {filteredData.map((item) => (
                    <li key={item._id}>
                        <span style={{ color: "darkgrey" }}>
                            {item.title}
                        </span> <br />
                        {/* <img
                            src={item.image}
                            alt="Product"
                            className="product-image"
                        /> */}
                        <br />
                        <strong>Description:</strong> {item.description}
                        <br />
                        <strong>Cost:</strong> {item.cost}
                        <br />
                        <button>
                            Add To Cart
                        </button>
                        <br></br>
                        


                    </li>



                ))}
                
            

        </ul>

    </div>
  )
}

export default SearchBar