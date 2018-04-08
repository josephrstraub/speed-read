import React from 'react';
import renderer from 'react-test-renderer';
import books from '../../mock/books';
import Main from './';

describe('Main Component', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Main />).toJSON();
    expect(rendered).toBeTruthy();
  });
  it('calls Google Books API after mounting', () => {
    fetch.mockResponse(JSON.stringify(books));
    renderer.create(<Main />);
    expect(fetch).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAP-RO8s7jbRWL95HXTOUVGsgJxM_ceAEM');
  });
});
