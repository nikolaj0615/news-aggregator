import React, { useState, useEffect, useCallback } from 'react';
import { fetchArticles,  } from '../api/service';
import { Button, Card, Form } from 'react-bootstrap';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import {Article} from "../types/Article";
import {NewsAggregatorProps} from "../types/Article";
import placeholder from "../assets/placeholder.jpeg"




const NewsAggregator: React.FC<NewsAggregatorProps> = ({ category }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [authorQuery, setAuthorQuery] = useState<string>('');
    const [sourceQuery, setSourceQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    useEffect(() => {
        const loadArticles = async () => {
            setLoading(true);
            try {
                const fetchedArticles = await fetchArticles(category);
                setArticles(fetchedArticles);
                setFilteredArticles(fetchedArticles);
            } catch (error) {
                console.error('Error loading articles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, [category]);

    useEffect(() => {
        if (articles.length > 0) {
            const sortedArticles = [...articles].sort((a, b) => {
                if (sortOrder === 'newest') {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                } else {
                    return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
                }
            });
            setFilteredArticles(sortedArticles);
        }
    }, [articles, sortOrder]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorQuery(event.target.value);
    };

    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSourceQuery(event.target.value);
    };

    const handleSearchSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const results = articles.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                article.author?.toLowerCase().includes(authorQuery.toLowerCase()) &&
                article.source.name?.toLowerCase().includes(sourceQuery.toLowerCase())
            );
            setFilteredArticles(results);
        },
        [articles, searchQuery, authorQuery, sourceQuery]
    );

    const handleSortToggle = () => {
        setSortOrder(prevOrder => (prevOrder === 'newest' ? 'oldest' : 'newest'));
    };

    return (
        <div>
            <div className="row align-items center justify-space-between my-4">
                <div className="col-md-6">
                    <Form onSubmit={handleSearchSubmit} className="d-flex flex-wrap flex-md-nowrap w-100">
                        <Form.Group controlId="titleQuery" className="me-2 search ">
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="authorQuery" className="me-2 search">
                            <Form.Control
                                type="text"
                                placeholder="Search by Author"
                                value={authorQuery}
                                onChange={handleAuthorChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="sourceQuery" className="me-2 search">
                            <Form.Control
                                type="text"
                                placeholder="Search by Source"
                                value={sourceQuery}
                                onChange={handleSourceChange}
                            />
                        </Form.Group>
                        <Button  type="submit" variant="primary">
                            Search
                        </Button>
                    </Form>

                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <Button
                        variant="secondary"
                        onClick={handleSortToggle}
                    >
                        {sortOrder === 'newest' ? (
                            <>
                                <FaSortAlphaDown /> Oldest
                            </>
                        ) : (
                            <>
                                <FaSortAlphaUp /> Newest
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : filteredArticles.length > 0 ? (
                <div className="row">
                    {filteredArticles.map((article, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <Card className="h-100">
                                <Card.Img variant="top" src={article?.urlToImage === null ?  placeholder : article?.urlToImage } />
                                <Card.Body className='p-0 d-flex flex-column justify-content-between'>
                                    <Card.Title className="text-center bg-primary text-white p-3">
                                        <h3>{article.title}</h3>
                                    </Card.Title>
                                    <div className="p-3 d-flex flex-column justify-content-between h-100">
                                        <Card.Text>
                                            <p className='text-center'>{article.description}</p>
                                        </Card.Text>
                                        <Card.Text className='d-flex align-items-center justify-content-between '>
                                            <p>Author: <span className='ps-2'>{article.author || 'Unknown author'}</span></p>
                                            <p>Source: <span className='ps-2'>{article.source.name || 'Unknown source'}</span></p>
                                        </Card.Text>

                                    </div>
                                    <div className="d-flex align-items-center justify-content-between p-3">
                                        <Button variant="primary">
                                            <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                                Read more
                                            </a>
                                        </Button>
                                        <p className='text-muted mb-0'>
                                            {article.publishedAt
                                                ? new Date(article.publishedAt).toLocaleDateString()
                                                : 'Unknown Date'}
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default NewsAggregator;
