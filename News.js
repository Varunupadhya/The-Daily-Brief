import React, { Component } from "react";
import NewsCard from "./NewsCard";
import PropTypes from 'prop-types'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articles: [],
            error: null
        };
    }
    
    updateNews = async () => {
        try {
            this.setState({ loading: true });
            
            const { category = 'general', country = 'us' } = this.props;
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=db1d30880781475eb46da6fd453901bd`;
            
            console.log("Fetching news from:", url);
            
            let response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            let parsedData = await response.json();
            
            console.log("API Response:", parsedData);
            
            if (parsedData.status === "error") {
                throw new Error(parsedData.message || "API returned an error");
            }
            
            this.setState({
                articles: parsedData.articles || [],
                loading: false
            });
        } catch (err) {
            console.error('News fetch error:', err);
            this.setState({
                error: err,
                loading: false
            });
        }
    };
    
    componentDidMount() {
        this.updateNews();
    }
    
    render() {
        const { loading, articles, error } = this.state;
        
        if (error) {
            return (
                <div className="container mt-5">
                    <div className="alert alert-danger">
                        Error loading news: {error.message}
                    </div>
                </div>
            );
        }
        
        return (
            <div className="container my-4">
                <h1 className="text-center mb-4" style={{ margin: '65px 0px' }}>
                    {'Top Headlines'} News
                </h1>
                
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    articles.length > 0 ? (
                        <div className="row">
                            {articles.map((element, index) => (
                                <div className="col-md-4 mb-4" key={element.url || index}>
                                    <NewsCard
                                        title={element.title || "No Title Available"}
                                        description={element.description || "No Description Available"}
                                        imageUrl={element.urlToImage}
                                        author={element.author}
                                        newsUrl={element.url}
                                        date={element.publishedAt}
                                        source={element.source?.name}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">No articles found for this category.</div>
                    )
                )}
            </div>
        );
    }
}
News.defaultProps = {
    country: 'in',
    //pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    //pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;