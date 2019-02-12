import React from 'react';
import PropTypes from 'prop-types';

import './article.css';

const Article = ({ title, snippet, url }) => (
    <li className="article">
        <div className="description">
            <a href={url} className="articleTitle">{title}</a>
            <p className="text">{snippet}</p>
        </div>
    </li>
);

Article.propTypes = {
    title: PropTypes.string,
    snippet: PropTypes.string,
    url: PropTypes.string,
};

Article.defaultProps = {
    title: 'Here should be a title',
    snippet: '',
    url: '#'
};

export default Article;