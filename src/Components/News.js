import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
        apikey: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.props.category} - News-Monkey`;
    }

    async updateNews() {
        const { country, category, apikey, pageSize } = this.props;
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: true
        });
        document.title = `${this.props.category} - News-Monkey`;
    }

    async componentDidMount() {
        this.updateNews();
    }

    async componentDidUpdate(prevProps) {
        // Refetch data when category, country, or pageSize changes
        if (this.props.category !== prevProps.category || this.props.country !== prevProps.country || this.props.pageSize !== prevProps.pageSize) {
            this.setState({ page: 1 }, () => this.updateNews()); // Reset to page 1 and fetch new data
        }
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const { country, category, apikey, pageSize } = this.props;
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };

    // prevClick = async () => {
    //     this.setState({ page: this.state.page - 1 }, this.updateNews);
    // }

    // nextClick = async () => {
    //     if (!(this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //         this.setState({ page: this.state.page + 1 }, this.updateNews);
    //     }
    // }

    render() {
        return (
            <>
                <h2 className='my-4 text-center'>News - Monkey -- Top HEADLINES on {this.props.category}</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.article.map((element) => {
                                return <div className="col-lg-3" key={element.url}>
                                    <NewsItem
                                        author={element.author}
                                        publish={element.publishedAt}
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        imgurl={element.urlToImage}
                                        newsurl={element.url}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container my-5 d-flex justify-content-end gap-3">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.prevClick} className="btn btn-dark">Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.nextClick} className="btn btn-dark">Next</button>
                </div> */}
            </>
        );
    }
}

export default News;
