
import React, {useState} from 'react'


const Search = ({history}) => {
    const [keyword, setKeyword] = useState('');
        const searchHandler = (e) =>{
            e.preventDefault()
    
            if(keyword.trim()) {
                let x = keyword;
                let str = '/search/' + x; 
                history.push(str)
            }
            else{
                history.push('/')
            }
        }

    return (
        
    
            <form onSubmit={searchHandler}>
            <div className="input-group">
                    <input 
                    type="text"
                    id="search-field"
                    className="form-control"
                    placeholder="Search Products..."
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn text-white">
                            <i className="fa fa-search" aria-hidden="true"></i> 
                        </button>

                    </div>
                </div>
            </form>
        
    )
}

export default Search
