import React, { Component } from 'react';

import './App.css';

import Title from './components/title/title';
import Article from './components/article/article';
import Input from './components/input/input';
import Button from './components/button/button';

const BASE_PATH = 'https://ru.wikipedia.org/w/api.php';
const SEARCH_PATH = 'action=opensearch&origin=*&search=';
const SEARCH_PARAM = 'format=json';

let id = 0;

class App extends Component {
    state = {
        searchQuery: '',
        result: [],
        story: [],
        isStoryButton: false,
        isDESC: false,
    };

    componentDidMount() {
        const { searchQuery } = this.state;
        this.fetchData(searchQuery);
    }

    fetchData = (searchQuery) => {
        fetch(`${BASE_PATH}?${SEARCH_PATH}${searchQuery}&${SEARCH_PARAM}`)
            .then(res => res.json())
            .then(result => this.setArticle(result))
            .catch(error => error);
    };

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value,
        });
    };

    getKeySearch = ({ key }) => {
        if(key === 'Enter') {
            this.getSearch();
        }
    };

    getSearch = () => {
        const { searchQuery} = this.state;
        this.state.story.push([id++, searchQuery]);
        this.fetchData(searchQuery);
        this.setState ({
            isStoryButton: false,
        })
    };

    getStory = () => {
        this.setState({
            isStoryButton: true,
        })
    };

    getSort = () => {
        const { result, isDESC } = this.state;
        if (result.length !== 0) {
            result.sort();
            if (isDESC) {
                result.reverse();
            }
            this.setState({
                isDESC: !isDESC,
            })
        }
    };

    setArticle = result => {
        let pureResult = [];
        for (let i = 0; i < result[1].length; i++) {
            pureResult.push([result[1][i], i, result[2][i], result[3][i]])
        }
        this.setState({
            result: pureResult,
        });
    };

    render() {
        const { searchQuery, result, isStoryButton, story } = this.state;
        console.log(result);
        const searchList = result.map(([title, number, snippet, url]) =>
            <Article key = {number}
                     title={title}
                     snippet={snippet}
                     url={url}
            />
        );
        const storyList = story.map(([i, item]) => <li key={i}>{item}</li>);

        return (
            <div className="wrapper">
                <Title title="Wikipedia Search" />
                <div className="inputWrapper">
                    <Input onKeyPress={this.getKeySearch} onChange={this.handleInputChange} value={searchQuery} />
                    <Button onClick={this.getSearch} value="Найти"/>
                    <Button onClick={this.getStory} value="История"/>
                    <Button onClick={this.getSort} value="Сортировать"/>
                </div>
                {isStoryButton && story.length > 0
                    ? <ul className="storyList">{storyList}</ul>
                    : <ul className="searchList">{searchList}</ul> }
            </div>
        );
    }
}

export default App;