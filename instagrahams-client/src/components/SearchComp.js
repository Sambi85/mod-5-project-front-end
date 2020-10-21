import React from 'react';
import { Search } from 'semantic-ui-react';

class SearchComp extends React.Component {

state = {
    "loading": false,
    "results": [],
    "value": ""
}

changeHandler = (event) => {
this.setState({
    searchTerm: event.target.value
})
}

    render() {
        return (
            <form >
                <input value={this.state.searchTerm} placeholder="Search" onChange={this.changeHandler}/>
            </form>
        )
    }
}

export default SearchComp