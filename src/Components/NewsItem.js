import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgurl, newsurl, author, publish } = this.props;
        return (
            <div>
                <div className="card">
                    <img
                        src={imgurl ? imgurl : "https://img.cnevpost.com/2024/09/29143336/2024092906333620-jpg.webp"}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <strong className='author'>Author: {author}</strong>
                        {/* for Gmt date format */}
                        <p className='publishAt'>Publish At: {new Date(publish).toGMTString()} </p>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsurl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
