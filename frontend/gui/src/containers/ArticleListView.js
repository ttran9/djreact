import React from 'react';
import axios from 'axios';
import Articles from '../components/Article';
import * as Constants from '../Constants';

class ArticleListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }


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

    deleteArticle(articleId) {
        if(window.confirm("Are you sure?")) {
            axios.delete(`${Constants.DELETE_API_URL}${articleId}`)
                .then(res => {
                    console.log("deleted article!");
                    window.location.reload();
                })
                .catch(err => {
                    console.log("cannot delete");
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <Articles data={this.state.articles} deleteArticle={this.deleteArticle}/>
        );
    }


}
export default ArticleListView;