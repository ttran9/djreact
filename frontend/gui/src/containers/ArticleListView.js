import React from 'react';
import axios from 'axios';
import Articles from '../components/Article';
import * as Constants from '../Constants';

class ArticleListView extends React.Component {

    state = {
      articles: []
    };

    componentDidMount() {
        // called whenever this component is mounted.
        axios.get(`${Constants.BASE_API_URL}`)
            .then(res => {
                this.setState({
                    articles: res.data
                });
            })
            .catch(err => {
                console.log("INSIDE LIST VIEW!!");
                console.log(err);
            });
    }

    render() {
        return (
            <Articles data={this.state.articles}/>
        );
    }
}
export default ArticleListView;