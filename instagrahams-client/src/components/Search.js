import React from 'react';

class Search extends React.Component {

state = {
    searchTerm: ""
}

changeHandler = (event) => {
this.setState({
    searchTerm: event.target.value
})
}

    render() {
        return (
            <form>
                <input value={this.state.searchTerm} placeholder="Search" onChange={this.changeHandler}/>
            </form>
        )
    }
}

export default Search